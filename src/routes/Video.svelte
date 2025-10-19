<script lang="ts">
  import { onMount } from 'svelte'
  import { views } from '$lib/views'

  let { src } = $props()

  let video: HTMLVideoElement

  onMount(async () => {
    // read last view position from indexedDb
    const viewed = await views.get(src)

    if (viewed) {
      // restore last position
      video.currentTime = viewed.position
    }
  })

  function ontimeupdate() {
    // persist current position to indexedDb
    views.put({ src, position: video.currentTime })
  }
</script>

<video bind:this={video} controls {ontimeupdate} width="400">
  <track kind="captions" />
  <source {src} type="video/mp4" />
</video>
