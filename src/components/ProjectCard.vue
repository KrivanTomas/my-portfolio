<script setup lang="ts">

import GithubIcon from './icons/IconGithub.vue'
import WebIcon from './icons/IconWeb.vue'
defineProps<{
  project_info: {
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
}>()
const getImageUrl = (path: string) => {
 return new URL(`../assets/${path}`, import.meta.url).href;
};
</script>

<template>
  <div class="project-card">
    <div class="splitter">
      <div>
      <h3 class="project-name">{{ project_info.name }}</h3>
      <small class="project-description">{{ project_info.description }}</small>
      <div class="pill-container">
          <div class="pill" v-for="tech in project_info.techs" :key="tech.id">{{ tech.text }}</div>
      </div>
      <p class="project-story">{{ project_info.story }}</p>
      </div>
      <div class="image-wrapper">
        <img class="project-picture" v-for="picture in project_info.pictures" :src="getImageUrl(picture)">
      </div>
    </div>
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
  background: var(--ku-background-soft);
  margin-bottom: 40px;
  padding: 20px;
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
  flex-wrap: wrap;
}

.splitter{
  width: 100%;
  display: flex;
}

.pill {
  background: var(--ku--background-mute);
  display: inline-block;
  height: 1.2em;
  padding: 5px;
  margin: 4px;
  box-sizing: content-box;
  border: solid 2px var(--color-border);
  border-radius: 8px;
  transition: box-shadow .1s;
  font-weight: 700;
  padding-inline: 10px;
  line-height: 1.2em;
  text-align: center;
  text-wrap: nowrap;
  word-wrap: none;
}

.link-pill {
  padding-inline: 7px;
  transition: color .2s, border .2s, background .2s;
  &:hover {
    color: var(--ku-accent-2) !important;
    background-color: var(--color-background-mute);
    border-color: var(--ku-accent);
    /* box-shadow: 3px 3px 2px var(--color-border-hover); */
  }
  &:link, &:visited{
    text-decoration: none;
    color: unset;
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
.image-wrapper{
  display: flex;
  width: 100%;
}

.project-picture {
  object-fit: cover;
  /* height: 100%;
  width: 50px; */
  width: 100%;
  border-radius: 20px;
}
@media screen and (max-width: 600px) {
  .splitter{
    flex-direction: column;
  }
  .image-wrapper {
    flex-direction: column;
  }
  .project-picture {
    margin-block: 10px;
  }
}
</style>
