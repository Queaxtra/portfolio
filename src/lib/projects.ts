export const getProjects = async () => {
    const response = await fetch('https://api.github.com/users/Queaxtra/repos');

    if (!response.ok) {
        throw new Error('Failed to fetch projects');
    }

    const data = await response.json();
    return data;
};