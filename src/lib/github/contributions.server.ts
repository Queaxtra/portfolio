import { env } from "$env/dynamic/private";

type GitHubContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

type GitHubContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel: GitHubContributionLevel;
};

type GitHubContributionWeek = {
  firstDay: string;
  contributionDays: GitHubContributionDay[];
};

export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type ContributionWeek = {
  firstDay: string;
  days: ContributionDay[];
};

export type ContributionResponse = {
  username: string;
  total: number;
  weeks: ContributionWeek[];
};

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: GitHubContributionWeek[];
        };
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
};

const username = "Queaxtra";
const graphQlEndpoint = "https://api.github.com/graphql";
const millisecondsPerDay = 24 * 60 * 60 * 1000;
const daysInCalendar = 371;
const contributionLevelMap: Record<GitHubContributionLevel, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export async function getGitHubContributions(fetcher: typeof fetch): Promise<ContributionResponse> {
  const githubToken = env.GITHUB_TOKEN;

  if (!githubToken) {
    throw new Error("GITHUB_TOKEN is required to load GitHub contributions");
  }

  try {
    const to = new Date();
    const from = new Date(to.getTime() - daysInCalendar * millisecondsPerDay);
    const response = await fetcher(graphQlEndpoint, {
      method: "POST",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${githubToken}`,
        "content-type": "application/json",
        "user-agent": "portfolio-contributions",
      },
      body: JSON.stringify({
        query: `
          query UserContributionCalendar($username: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $username) {
              contributionsCollection(from: $from, to: $to) {
                contributionCalendar {
                  totalContributions
                  weeks {
                    firstDay
                    contributionDays {
                      date
                      contributionCount
                      contributionLevel
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          username,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub GraphQL responded with ${response.status}`);
    }

    const payload = (await response.json()) as GraphQLResponse;

    if (payload.errors?.length) {
      throw new Error(payload.errors[0]?.message ?? "GitHub GraphQL returned an error");
    }

    if (payload.data?.user === null) {
      throw new Error(`GitHub user ${username} was not found`);
    }

    const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      throw new Error("GitHub contribution calendar was not found");
    }

    return {
      username,
      total: calendar.totalContributions,
      weeks: calendar.weeks.map((week) => ({
        firstDay: week.firstDay,
        days: week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: contributionLevelMap[day.contributionLevel],
        })),
      })),
    };
  } catch (error) {
    console.error("github graphql contributions failed", {
      username,
      message: error instanceof Error ? error.message : "unknown error",
    });
    throw error;
  }
}
