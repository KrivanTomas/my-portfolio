<script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import ProjectCard from './components/ProjectCard.vue'

  let id = 0
  let pill_id = 0
  type project = {
      id: number,
      name: string,
      description: string,
      techs: {id: number, text: string}[]
      links: {id: number, text: string, icon: string, link: string}[]
  }
  const projects: Ref<project[]> = ref([
    {
      id: id++,
      name: 'card-engine',
      techs: [
        {id: pill_id++, text: 'C#'},
        {id: pill_id++, text: 'Unity'}
      ],
      description: `This is the first proper game I made in Unity with my friend. 
        While it is not the perfect game, it helped me understand the workflow of a 
        small team as well as maintaining a clean codebase for colaboration.`,
      links: [
        {id: pill_id++, text: 'Github repo', icon: 'GithubIcon', link: 'https://github.com/KrivanTomas/card-engine'},
        {id: pill_id++, text: 'Website', icon: 'WebIcon', link: 'http://card-engine.g6.cz'}
      ]
    },
    {
      id: id++,
      name: 'baka-parser',
      techs: [
        {id: pill_id++, text: 'Javascript / Typescript'},
        {id: pill_id++, text: 'Node.js'}
      ],
      description: `Loremu ipusume dolaru qivemu idkemu.`,
      links: [
        {id: pill_id++, text: 'Github repo', icon: 'GithubIcon', link: 'https://github.com/KrivanTomas/baka-parser'},
      ]
    },
    {
      id: id++,
      name: 'winforms-render-engine',
      techs: [
        {id: pill_id++, text: 'C#'},
        {id: pill_id++, text: 'Windows Forms'}
      ],
      description: `This was an intentional challange for me. Pushing the Windows Forms
        platform to do stuff it was never meant for. This kind of limitaion
        and the notoriety winforms had in our high school at that time, really
        motivated me to do this kind of "stupid" thing.`,
      links: [
        {id: pill_id++, text: 'Github repo', icon: 'GithubIcon', link: 'https://github.com/KrivanTomas/winforms-render-engine'},
      ]
    }
  ])
</script>

<template>
  <main>
      <ProjectCard v-for="project in projects" :key="project.id" :project_info="project"/>
  </main>





  <header>
    <!-- <div class="headshot"></div> -->
    <div class="heading-content">
        <h1 class="title">Hi, I’m Kuro!</h1>
        <!-- Tomáš Křivan</h1> -->
        <p class="whoami">Student / Game developer</p> 
    </div>
</header>

    <h2 class="section-title">About</h2>
    <p class="project-description">
        I love learing new things, be it web development, 
        gamemaking, art and design or music. 
    </p>
    <h2 class="section-title">Experience</h2>
    <code>Javascript / TypeScript, php, C#, C++, GDScript, Python, GLSL</code>
    <h2 class="section-title">My projects</h2>


  <h2 class="section-title">What’s next</h2>
    <h3>Godot</h3>
    <h3>C++</h3>
    <h2 class="section-title">Contact</h2>

</template>

<style scoped>

</style>
