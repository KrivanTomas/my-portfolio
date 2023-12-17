<script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import ProjectCard from './components/ProjectCard.vue'
  import Header from './components/Header.vue';

  let id = 0
  let pill_id = 0
  type project = {
      id: number,
      name: string,
      description: string,
      story: string,
      thegood?: string,
      thebad?: string,
      techs: {id: number, text: string}[]
      links: {id: number, text: string, icon: string, link: string}[]
  }
  const projects: Ref<project[]> = ref([
    {
      id: id++,
      name: 'Card engine',
      description: `A cardgame-oriented framework with demo card games.`,
      story: `This is the first proper game I made in Unity with my friend. 
      While it is not the perfect game, it helped me understand the workflow of a 
      small team as well as maintaining a clean codebase for colaboration.`,
      techs: [
        {id: pill_id++, text: 'Graphics'},
        {id: pill_id++, text: 'C#'},
        {id: pill_id++, text: 'Unity'},
      ],
      links: [
        {id: pill_id++, text: 'Github repo', icon: 'GithubIcon', link: 'https://github.com/KrivanTomas/card-engine'},
        {id: pill_id++, text: 'Website', icon: 'WebIcon', link: 'http://card-engine.g6.cz'}
      ]
    },
    {
      id: id++,
      name: 'Baka parser',
      description: `A CLI parser for the Bakalari web timetable.`,
      story: `Loremu ipusume dolaru qivemu idkemu.`,
      techs: [
        {id: pill_id++, text: 'Javascript / Typescript'},
        {id: pill_id++, text: 'CLI'},
        {id: pill_id++, text: 'API'},
        {id: pill_id++, text: 'Node.js'},
      ],
      links: [
        {id: pill_id++, text: 'Github repo', icon: 'GithubIcon', link: 'https://github.com/KrivanTomas/baka-parser'},
      ]
    },
    {
      id: id++,
      name: 'Winforms render engine',
      description: `A basic STL model renderer in windows forms.`,
      story: `This was an intentional challange for me. Pushing the Windows Forms
      platform to do stuff it was never meant for. This kind of limitaion
      and the notoriety winforms had in our high school at that time, really
      motivated me to do this kind of "stupid" thing.`,
      techs: [
        {id: pill_id++, text: 'Graphics'},
        {id: pill_id++, text: 'C#'},
        {id: pill_id++, text: 'Windows Forms'},
      ],
      links: [
        {id: pill_id++, text: 'Github repo', icon: 'GithubIcon', link: 'https://github.com/KrivanTomas/winforms-render-engine'},
      ]
    }
  ])
</script>

<template>
  <Header />
  <main class="main">
      <h2 class="section-title">About</h2>
      <p class="project-description">
          I love learing new things, be it web development, 
          gamemaking, art and design or music. 
      </p>
      <h2 class="section-title">Experience</h2>
      <code>Javascript / TypeScript, php, C#, C++, GDScript, Python, GLSL</code>
      <h2 class="section-title">My projects</h2>
      <div class="project-card-wrapper">
        <ProjectCard v-for="project in projects" :key="project.id" :project_info="project"/>
      </div>
      <h2 class="section-title">What’s next</h2>
    <h3>Godot</h3>
    <h3>C++</h3>
  </main>

    <footer class="footer">
      Contact
      <br>Email: <a href="mailto:cyan.roke@gmail.com?subject=Commision request!!&body=Hi, can you make me a website!?? :)">cyan.roke@gmail.com</a>
      <br>Tel: <a href="tel:+420776436619">+420 776 436 619</a>
      <br>Timezone: UTC+01:00 (Call at resonable times please)
    </footer>

</template>

<style scoped>
.main {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px;
}
.footer {
  width: 100%;
  min-height: 200px;
  background: var(--color-background-soft);
}
</style>
