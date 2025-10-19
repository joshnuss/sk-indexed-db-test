<script lang="ts">
  import { onMount } from 'svelte'
  import { views } from '$lib/views'

  let { src } = $props()

  let video: HTMLVideoElement

  onMount(async () => {
    // read last view position from indexedDb
    const view = await views.get(src)

    if (view) {
      // restore last position
      video.currentTime = view.position
    }
  })

  function ontimeupdate() {
    const position = video.currentTime

    // persist current position to indexedDb
    views.put({ src, position })
  }
</script>

<video bind:this={video} controls {ontimeupdate} width="400">
  <track kind="captions" />
  <source {src} type="video/mp4" />
</video>
