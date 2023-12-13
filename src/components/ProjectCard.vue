<script setup lang="ts">
import GithubIcon from './icons/IconGithub.vue'
import WebIcon from './icons/IconWeb.vue'
defineProps<{
  project_info: {
    id: number,
    name: string,
    description: string,
    techs: {id: number, text: string}[]
    links: {id: number, text: string, icon: string, link: string}[]
  }
}>()
</script>

<template>
  <div class="project-card">
    <h3 class="project-name">{{ project_info.name }}</h3>
    <div class="pill-container">
        <div class="pill" v-for="tech in project_info.techs" :key="tech.id">{{ tech.text }}</div>
    </div>
    <p class="project-description">{{ project_info.description }}</p>
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
  max-width: 1000px;
  background: var(--color-background);
  padding: 20px;
  margin: 30px;
  border-radius: 5px;

  .project-name {
    font-size: 30px;
    margin-bottom: 10px;
  }

  .project-description {
    margin: 20px;
  }
}
.pill-container {
  display: flex;
  padding: 10px;
}

.pill {
  background: var(--color-background-soft);
  display: inline-block;
  height: 1.2em;
  min-width: 5px;
  padding: 5px;
  margin-inline: 4px;
  box-sizing: content-box;
  border-radius: 1em;
  transition: box-shadow .1s;
  font-weight: 700;
  padding-inline: 10px;
  line-height: 1.2em;
  text-align: center;
}

.link-pill {
  padding-inline: 7px;
  &:hover {
    box-shadow: 3px 3px 2px var(--color-border-hover);
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
