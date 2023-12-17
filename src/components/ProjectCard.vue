<script setup lang="ts">
import GithubIcon from './icons/IconGithub.vue'
import WebIcon from './icons/IconWeb.vue'
defineProps<{
  project_info: {
    id: number,
    name: string,
    description: string,
    story: string,
    techs: {id: number, text: string}[]
    links: {id: number, text: string, icon: string, link: string}[]
  }
}>()
</script>

<template>
  <div class="project-card">
    <h3 class="project-name">{{ project_info.name }}</h3>
    <small class="project-description">{{ project_info.description }}</small>
    <div class="pill-container">
        <div class="pill" v-for="tech in project_info.techs" :key="tech.id">{{ tech.text }}</div>
    </div>
    <p class="project-story">{{ project_info.story }}</p>
    <div class="pill-container">
        <a class="pill link-pill" v-for="link in project_info.links" target="_blank" :href="link.link" :key="link.id">
            <GithubIcon v-if="link.icon == 'GithubIcon'" />
            <WebIcon v-else-if="link.icon == 'WebIcon'"/>
            <div>{{ link.text }}</div>
        </a>
    </div>
    </div>
</template>

<style scoped>

.project-card {
  background: var(--color-background-mute);
  padding: 20px;
  margin: 50px;
  border-radius: 5px;
}
.project-name {
  font-size: 30px;
  margin-bottom: 0px;
}
.project-description {
  display: block;
  margin-bottom: 5px;
}
.project-story {
  margin: 20px;
}
.pill-container {
  display: flex;
  padding: 10px;
}

.pill {
  background: var(--color-background);
  display: inline-block;
  height: 1.2em;
  min-width: 5px;
  padding: 5px;
  margin-inline: 4px;
  box-sizing: content-box;
  border: solid 2px var(--color-border);
  border-radius: 8px;
  transition: box-shadow .1s;
  font-weight: 700;
  padding-inline: 10px;
  line-height: 1.2em;
  text-align: center;
}

.link-pill {
  padding-inline: 7px;
  &:hover {
    background-color: var(--color-background-mute);
    border-color: rgb(107, 19, 107);
    /* box-shadow: 3px 3px 2px var(--color-border-hover); */
  }
  &:link, &:visited{
    text-decoration: none;
    color: inherit;
  }
  div, svg {
    display: inline;
    height: 100%;
  }
  svg {
    margin-right: 5px;
  }
  div {
    position: relative;
    top: -15%;
  }
}
</style>
