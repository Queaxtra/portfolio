<script>
  let nowYear = new Date().getFullYear();
  let age = nowYear - 2005;

  let connections = [
    {
      icon: "fa-solid fa-envelope",
      name: "Email",
      value: "mailto:queaxtra@duck.com",
    },
    {
      icon: "fa-brands fa-github",
      name: "GitHub",
      value: "https://github.com/Queaxtra",
    },
    {
      icon: "fa-brands fa-twitter",
      name: "Twitter",
      value: "https://twitter.com/Queaxtra",
    },
    {
      icon: "fa-brands fa-discord",
      name: "Discord",
      value: "https://discord.com/users/825370766999552011",
    },
    {
      icon: "fa-brands fa-instagram",
      name: "Instagram",
      value: "https://instagram.com/queaxtra",
    },
    {
      icon: "fa-brands fa-linkedin",
      name: "LinkedIn",
      value: "https://www.linkedin.com/in/queaxtra",
    }
  ];
</script>

<div class="container mx-auto p-4 text-center">
  <h1 class="relative mt-16 text-3xl font-semibold">Hi, I'm Fatih Yılmaz</h1>
  <p class="opacity-80 font-mono text-sm">
    Founder of <a class="underline decoration-wavy" href="https://github.com/unoxdevs">UnoxDevs</a>
  </p>

  <div class="mt-5 flex items-center justify-center">
    <p class="w-[50rem] font-mono text-sm">
      I am a {age} years old front-end developer living in Turkey. I am actively
      developing projects with the team I founded called <b>UnoxDevs.</b>
    </p>
  </div>

  {#each connections as connection}
    <div class="inline-block mt-5">
        <a class="mx-4" href={connection.value}>
            <i class="fa-sm {connection.icon}"></i> {connection.name}
        </a>
    </div>
  {/each}
</div>
