<script lang="ts">
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import { toast } from '@zerodevx/svelte-toast';
  import { onMount } from 'svelte';

  let { removeComponent } = $props();

  let questionId = $state(0);
  let questionContent = $state('');
  let rendered = $state(false);
  let posX = $state(40);
  let posY = $state(window.innerHeight / 2);
  let offsetX = $state(0);
  let offsetY = $state(0);
  let isDragging = $state(false);

  const updateQuestionId = async (element: Element) => {
    const newId = parseInt(element.getAttribute('data-id') ?? '0');
    const questionElement = document.querySelector(
      '#content-question-start > p'
    );
    if (questionElement) {
      questionContent = questionElement.innerHTML;
    }
    if (newId !== questionId) {
      questionId = newId;
    }
  };

  const mutationObserver = new MutationObserver((mutations) => {
    const questionElement = (
        document.querySelector('.question-container') ||
        document.querySelector('.question-content')
    );
    
    if (questionElement) {
      updateQuestionId(questionElement);
      rendered = true;
    } else {
        if (rendered) {
            questionId = 0;
            questionContent = '';
        }
    }
  });

  onMount(async () => {
    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(questionId.toString());
    toast.push({
      msg: 'Copied to clipboard',
      classes: ['ex-toast'],
      theme: {
        '--toastColor': 'mintcream',
        '--toastBackground': 'black',
        '--toastBarBackground': '#444922',
      },
    });
  };

  const handleClose = () => {
    removeComponent();
  };

  function handlePointerDown(event: PointerEvent) {
    isDragging = true;
    offsetX = event.clientX - posX;
    offsetY = event.clientY - posY;
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  }

  function handlePointerMove(event: PointerEvent) {
    if (!isDragging) return;
    posX = event.clientX - offsetX;
    posY = event.clientY - offsetY;
  }

  function handlePointerUp() {
    isDragging = false;
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
  }
</script>

<SvelteToast options={{ duration: 2000 }} />

<main style="top: {posY}px; left: {posX}px;">
  <header
    aria-label="Drag handle"
    role="button"
    onpointerdown={handlePointerDown}
  >
    <span>{questionId ? 'Question Detected' : 'Pending...'}</span>
    <button class="close" onclick={handleClose}>&times;</button>
  </header>
  <article>
    {#if questionId}
      <span>
        ID: <button title="Click to copy" class="copyable" onclick={handleCopy}>
            {questionId}
        </button>
      </span>
      <div class="question line-clamp2">
        {@html questionContent}
      </div>
    {:else}
      <span>Looking for question</span>
    {/if}
  </article>
</main>

<style>
  :global(.ex-toast) {
    font-family: monospace;
    font-weight: bold;
    font-size: 14px;
  }
  main {
    position: fixed;
    background-color: #1b1a1a;
    color: white;
    border-radius: 5px;
    z-index: 100000000;
    width: 300px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    font-family: monospace;
    user-select: none;
    overflow: hidden;
  }
  .copyable {
    cursor: pointer;
    user-select: none;
    font-weight: bold;
    font-size: 16px;
  }
  .copyable:hover {
    text-decoration: underline;
  }
  .question {
    color: #c8c8c8;
    line-height: 1.4;
  }
  .line-clamp2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #444922;
    padding: 4px 10px;
    font-size: 14px;
    color: white;
    cursor: move;
  }
  header button {
    font-size: 18px;
  }
  button {
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
    padding: 0;
  }
  article {
    padding: 6px 10px;
  }
</style>
