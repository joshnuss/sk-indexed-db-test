<script lang="ts">
  import { views } from '$lib/views'

  let { src } = $props()

  let video: HTMLVideoElement
  let loaded = false

  async function onloadedmetadata() {
    loaded = true
    // read last view position from indexedDb
    const viewed = await views.get(src)

    if (viewed) {
      // restore last position
      video.currentTime = viewed.position
    }
  }

  function ontimeupdate() {
    // avoid overwriting position when `ontimeupdate` event fires before `onloadedmetadata`
    if (!loaded) return

    // persist current position to indexedDb
    views.put({ src, position: video.currentTime })
  }
</script>

<video bind:this={video} controls {onloadedmetadata} {ontimeupdate} width="400">
  <track kind="captions" />
  <source {src} type="video/mp4" />
</video>
