<script lang="ts">
  import { onMount } from 'svelte'
  import { views } from '$lib/views'

  let video: HTMLVideoElement

  const id = 'fake-id'

  onMount(async () => {
    // read last view position from indexedDb
    const view = await views.get(id)

    if (view) {
      // restore last position
      video.currentTime = view.position
    }
  })

	function ontimeupdate() {
    const position = video.currentTime

    // persist current position to indexedDb
    views?.put({ id, position })
	}
</script>

<header>
  <h1>Video position tracking</h1>
  <p>Saves video position in IndexDB and recovers it on mount.</p>
</header>

<video bind:this={video} controls {ontimeupdate} width=400>
  <track kind="captions"/>
  <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
</video>
