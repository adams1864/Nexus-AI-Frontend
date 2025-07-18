<script setup lang="ts">
import { ref, onMounted } from 'vue';

const showButton = ref(false);
const scrapedData = ref<Record<string, any> | null>(null);

onMounted(async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.url?.startsWith('https://www.upwork.com/')) {
    showButton.value = true;
  }
});

const applyWithNexus = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;
  chrome.tabs.sendMessage(tab.id, { action: 'scrape_and_send' }, (response) => {
    if (chrome.runtime.lastError) {
      alert('Nexus cannot run on this page.');
    } else {
      scrapedData.value = response;
    }
  });
};
</script>

<template>
  <div style="padding: 16px; width: 280px;">
    <h2>Nexus Apply</h2>

    <button v-if="showButton" @click="applyWithNexus">Apply with Nexus</button>
    <p v-else>Only works on Upwork</p>

    <div v-if="scrapedData" style="margin-top: 16px;">
      <h3>Job Info:</h3>
      <ul>
        <li><strong>Title:</strong> {{ scrapedData.title }}</li>
        <li><strong>Description:</strong>
          <div style="max-height: 100px; overflow-y: auto;">
            {{ scrapedData.description }}
          </div>
        </li>
        <li><strong>Budget:</strong> {{ scrapedData.budget }}</li>
        <li><strong>Posted:</strong> {{ scrapedData.postedDate }}</li>
        <li><strong>Location:</strong> {{ scrapedData.clientLocation }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
button {
  padding: 8px 16px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #369c72;
}
</style>
