document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const wordCount = document.getElementById('word-count');
    const charCount = document.getElementById('char-count');
    const sentenceCount = document.getElementById('sentence-count');
    const paragraphCount = document.getElementById('paragraph-count');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');

    function updateCounts() {
        const text = textInput.value;

        // Word count - improved to handle multiple spaces and line breaks
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        wordCount.textContent = words.length;

        // Character count
        charCount.textContent = text.length;

        // Sentence count - improved to handle multiple sentence endings
        const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
        sentenceCount.textContent = sentences.length;

        // Paragraph count - improved to handle different types of line breaks
        const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0);
        paragraphCount.textContent = paragraphs.length;
    }

    function animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            element.textContent = current;
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    textInput.addEventListener('input', updateCounts);

    clearBtn.addEventListener('click', () => {
        const previousCounts = {
            words: parseInt(wordCount.textContent),
            chars: parseInt(charCount.textContent),
            sentences: parseInt(sentenceCount.textContent),
            paragraphs: parseInt(paragraphCount.textContent)
        };

        textInput.value = '';

        animateValue(wordCount, previousCounts.words, 0, 300);
        animateValue(charCount, previousCounts.chars, 0, 300);
        animateValue(sentenceCount, previousCounts.sentences, 0, 300);
        animateValue(paragraphCount, previousCounts.paragraphs, 0, 300);
    });

    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(textInput.value);
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied Successfully!';
            copyBtn.style.background = '#f1f5f9';
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.background = '#f8fafc';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
            copyBtn.textContent = 'Failed to copy';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        }
    });
});