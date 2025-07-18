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

  chrome.tabs.sendMessage(
    tab.id,
    { action: 'scrape_and_send' },
    (response) => {
      if (chrome.runtime.lastError) {
        alert('Nexus cannot run on this page.');
        return;
      }
      scrapedData.value = response;
    }
  );
};
</script>

<template>
  <div style="padding: 16px; width: 300px; font-family: sans-serif;">
    <h2>Nexus Apply</h2>

    <button
      v-if="showButton"
      @click="applyWithNexus"
      style="padding: 8px 16px; background: #42b883; color: white; border: none; border-radius: 4px; cursor: pointer;"
    >
      Apply with Nexus
    </button>
    <p v-else>Only works on Upwork</p>

    <div v-if="scrapedData" style="margin-top: 16px;">
      <h3>Job Info</h3>
      <ul style="list-style: none; padding: 0;">
        <li><strong>Title:</strong> {{ scrapedData.title }}</li>
        <li><strong>Description:</strong>
          <div style="max-height: 80px; overflow-y: auto; white-space: pre-wrap;">
            {{ scrapedData.description }}
          </div>
        </li>
        <li><strong>Budget:</strong> {{ scrapedData.budget }}</li>
        <li><strong>Posted:</strong> {{ scrapedData.postedDate }}</li>
        <li><strong>Location:</strong> {{ scrapedData.clientLocation }}</li>
        <li><strong>URL:</strong>
          <a :href="scrapedData.url" target="_blank" style="color: #288cd7;">
            Open in new tab
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
