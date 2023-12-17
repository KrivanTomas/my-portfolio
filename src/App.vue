<script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import ProjectCard from './components/ProjectCard.vue'
  import Header from './components/Header.vue';

  
  type project = {
    id: number,
    name: string,
    description: string,
    story: string,
    thegood?: string,
    thebad?: string,
    pictures: string[],
    techs: {id: number, text: string}[]
    links: {id: number, text: string, icon: string, link: string}[]
  }
  import projects_json from './assets/projects.json';
  const projects: Ref<project[]> = ref(projects_json)
</script>

<template>
  <Header />
  <main class="main">
      <section class="section about-me-wrapper">
        <h2 class="section-title">About me</h2>
        <p class="about-me-description">
            I love learing new things, be it web development, 
            gamemaking, art and design or music. 
        </p>
      </section>
      <section class="section experience-wrapper">
        <h2 class="section-title">Experience</h2>
        <p>Javascript, TypeScript, php, C#, C++, GDScript, Python, GLSL</p>
      </section>
      <section class="section project-card-wrapper">
        <h2 class="section-title">My projects</h2>
        <ProjectCard v-for="project in projects" :key="project.id" :project_info="project"/>
      </section>
      <h2 class="section-title">What’s next</h2>
    <h3>Godot</h3>
    <h3>C++</h3>
  </main>

    <footer class="footer">
      <div class="footer-blocks">
        <div>
          <p class="footer-label">Social</p>
          <table>
            <tr>
              <td>Github:</td>
              <td><a href="https://github.com/KrivanTomas">KrivanTomas</a></td>
            </tr>
            <tr>
              <td>Wakatime:</td>
              <td><a href="https://wakatime.com/@CyanRoke">@CyanRoke</a></td>
            </tr>
            <tr>
              <td>Steam:</td>
              <td><a href="https://steamcommunity.com/id/cyanroke/">CyanRoke</a></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
        <div>
          <p class="footer-label">Contact</p>
          <table>
            <tr>
              <td>Real name:</td>
              <td>Tomáš Křivan</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td><a href="mailto:cyan.roke@gmail.com?subject=Commision request!!&body=Hi, can you make me a website!?? :)">cyan.roke@gmail.com</a></td>
            </tr>
            <tr>
              <td>Tel:</td>
              <td><a href="tel:+420776436619">+420 776 436 619</a></td>
            </tr>
            <tr>
              <td>Timezone:</td>
              <td>UTC+01:00</td>
            </tr>
          </table>
        </div>
      </div>
      <p class="copy">&copy; 2023 Tomáš Křivan</p>
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

.section {
  width: 100%;
}

.section-title {
  font-size: 60px;
}


.footer {
  width: 100%;
  background: var(--color-background-soft);
  padding-top: 20px;
}

.footer-blocks{
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
}
.copy {
  text-align: center;
  padding: 10px;
}

.footer-label {
  font-weight: 600;
}
/* tr>td:first-child{
  text-align: end;
} */
</style>
