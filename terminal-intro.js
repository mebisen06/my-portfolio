document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('terminal-intro-overlay');
    const outputArea = document.getElementById('terminal-output');
    
    function trackVisitor(name, clearance) {
        console.log('Visitor tracking disabled for static version.');
    }

    // Check if intro has already been played in this session to prevent annoyance on refresh
    if (sessionStorage.getItem('introCompleted') === 'true') {
        overlay.style.display = 'none';
        trackVisitor();
        return;
    }

    // Lock background scrolling
    document.body.classList.add('terminal-active');

    const typingSpeed = 25; // ms per character
    const delayBetweenLines = 300; // ms between lines

    // The sequence of events
    const sequence = [
        { text: "AUTHENTICATING...", type: "sys", delay: 600 },
        { text: "ACCESS GRANTED. DECRYPTING PORTFOLIO DATA...", type: "success", delay: 1000 },
        { ascii: `<span style="color:var(--primary); font-family:monospace; font-weight:bold; font-size: 14px; line-height: 1.2;">
███╗   ███╗███████╗███████╗████████╗
████╗ ████║██╔════╝██╔════╝╚══██╔══╝
██╔████╔██║█████╗  █████╗     ██║   
██║╚██╔╝██║██╔══╝  ██╔══╝     ██║   
██║ ╚═╝ ██║███████╗███████╗   ██║   
╚═╝     ╚═╝╚══════╝╚══════╝   ╚═╝   </span>
<br><span style="color:#e5e2e1;">[SYSTEM INITIALIZED] - root@mebisen06</span>`, type: "sys", delay: 1200 },
        { action: "finish" }
    ];

    let currentStep = 0;
    const userData = {};

    function createLineElement(type) {
        const line = document.createElement('div');
        line.className = 'term-line';
        
        if (type === 'prompt') {
            const promptSpan = document.createElement('span');
            promptSpan.className = 'term-prompt';
            promptSpan.textContent = 'root@mebisen06:~$ ';
            line.appendChild(promptSpan);
        } else if (type === 'sys' || type === 'success') {
            line.classList.add('term-sys');
            if(type === 'success') {
                line.style.color = 'var(--secondary)'; // Green
            }
        }
        
        const textSpan = document.createElement('span');
        textSpan.className = 'term-text';
        line.appendChild(textSpan);
        
        outputArea.appendChild(line);
        return textSpan;
    }

    function typeText(element, text, speed, callback) {
        let i = 0;
        function typeChar() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                outputArea.scrollTop = outputArea.scrollHeight;
                setTimeout(typeChar, Math.random() * speed + (speed / 2)); // Add slight randomness for realism
            } else {
                if (callback) callback();
            }
        }
        typeChar();
    }

    function createInput(stepData, callback) {
        // Render options if any
        if (stepData.options) {
            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'term-options';
            stepData.options.forEach(opt => {
                const optEl = document.createElement('div');
                optEl.className = 'term-option';
                optEl.innerHTML = `<span class="term-option-key">${opt.split(']')[0] + ']'}</span> ${opt.split(']')[1].trim()}`;
                optionsDiv.appendChild(optEl);
            });
            outputArea.appendChild(optionsDiv);
        }

        const inputLine = document.createElement('div');
        inputLine.className = 'term-input-line';
        
        const promptSpan = document.createElement('span');
        promptSpan.className = 'term-prompt';
        promptSpan.textContent = 'guest@mebisen06:~$ ';
        
        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'term-input-wrapper';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'term-input';
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('spellcheck', 'false');
        
        const cursor = document.createElement('span');
        cursor.className = 'term-cursor';
        
        inputWrapper.appendChild(input);
        inputWrapper.appendChild(cursor);
        
        inputLine.appendChild(promptSpan);
        inputLine.appendChild(inputWrapper);
        
        outputArea.appendChild(inputLine);
        
        // Timeout to ensure DOM has updated before focusing
        setTimeout(() => {
            input.focus();
            outputArea.scrollTop = outputArea.scrollHeight;
        }, 10);

        const keepFocus = () => {
            if(document.activeElement !== input) {
                input.focus();
            }
        };
        document.addEventListener('click', keepFocus);

        // Mobile options click handler
        if (stepData.options) {
            const optionElements = outputArea.querySelectorAll('.term-option');
            optionElements.forEach(optEl => {
                optEl.addEventListener('click', (e) => {
                    e.stopPropagation(); // prevent keepFocus from stealing
                    // Extract just the number inside the brackets e.g. [1] -> 1
                    const match = optEl.textContent.match(/\[(.*?)\]/);
                    if (match) {
                        input.value = match[1];
                        submitInput();
                    }
                });
            });
        }

        const submitInput = () => {
            const val = input.value.trim();
            if (!val) return;
            

            
            userData[stepData.key] = val;
            
            // Lock input and remove cursor
            input.disabled = true;
            cursor.style.display = 'none';
            document.removeEventListener('click', keepFocus);
            
            // Update terminal title if they gave a name
            if(stepData.key === 'name') {
                document.querySelector('.terminal-title').textContent = `${val.toLowerCase()}@mebisen06:~$`;
            }

            callback();
        };

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                submitInput();
            }
        });
    }

    function processNextStep() {
        if (currentStep >= sequence.length) return;
        
        const step = sequence[currentStep];
        
        if (step.action === 'finish') {
            setTimeout(() => {
                // Fade out overlay
                overlay.classList.add('hidden');
                document.body.classList.remove('terminal-active');
                
                // Mark intro as completed for this session
                sessionStorage.setItem('introCompleted', 'true');
                sessionStorage.setItem('termName', userData.name || '');
                
                sessionStorage.removeItem('termClearance'); // Clean up old data if it exists
                
                trackVisitor(userData.name, null);
                
                // Completely remove from DOM flow after fade
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 1000);
            }, 600);
            return;
        }

        setTimeout(() => {
            if (step.text) {
                const textEl = createLineElement(step.type);
                typeText(textEl, step.text, typingSpeed, () => {
                    if (step.input) {
                        createInput(step, () => {
                            currentStep++;
                            processNextStep();
                        });
                    } else {
                        currentStep++;
                        processNextStep();
                    }
                });
            } else if (step.ascii) {
                const textEl = createLineElement(step.type);
                textEl.style.whiteSpace = 'pre';
                textEl.innerHTML = step.ascii;
                outputArea.scrollTop = outputArea.scrollHeight;
                setTimeout(() => {
                    currentStep++;
                    processNextStep();
                }, step.delay || delayBetweenLines);
            }
        }, step.delay || delayBetweenLines);
    }

    // Start sequence after brief delay for aesthetics
    setTimeout(processNextStep, 800);
});
