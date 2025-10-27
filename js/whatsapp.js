 // WhatsApp Chat Widget Script
        (function() {
            // Configuration
            const config = {
                phoneNumber: '+1 (703) 930 9011', // Replace with your WhatsApp number (include country code, no + symbol)
                businessName: 'Francisca Boateng',
                welcomeMessage: 'Hey, welcome to my page, How can i help you?',
                responseTime: 'Replies within 1 day',
                defaultMessage: 'Hello! I saw your website and I\'m interested in your services.',
            };
            
            // Get elements
            const whatsappButton = document.getElementById('whatsappButton');
            const whatsappChat = document.getElementById('whatsappChat');
            const closeBtn = document.getElementById('closeChat');
            const startChatBtn = document.getElementById('startChatBtn');
            const messageInput = document.getElementById('messageInput');
            const sendBtn = document.getElementById('sendBtn');
            
            // Toggle chat widget
            function toggleChat() {
                whatsappChat.classList.toggle('show');
                if (whatsappChat.classList.contains('show')) {
                    setTimeout(() => messageInput.focus(), 300);
                }
            }
            
            // Close chat widget
            function closeChat() {
                whatsappChat.classList.remove('show');
            }
            
            // Start WhatsApp chat
            function startWhatsAppChat(customMessage = null) {
                const message = customMessage || config.defaultMessage;
                const whatsappURL = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappURL, '_blank');
                closeChat();
                messageInput.value = ''; // Clear input after sending
                updateSendButton();
            }
            
            // Update send button state
            function updateSendButton() {
                const hasText = messageInput.value.trim().length > 0;
                sendBtn.disabled = !hasText;
            }
            
            // Handle message input
            function handleMessageInput() {
                updateSendButton();
                
                // Auto-resize textarea
                messageInput.style.height = 'auto';
                messageInput.style.height = Math.min(messageInput.scrollHeight, 80) + 'px';
            }
            
            // Send custom message
            function sendCustomMessage() {
                const message = messageInput.value.trim();
                if (message) {
                    startWhatsAppChat(message);
                }
            }
            
            // Event listeners
            whatsappButton.addEventListener('click', toggleChat);
            closeBtn.addEventListener('click', closeChat);
            startChatBtn.addEventListener('click', () => startWhatsAppChat());
            sendBtn.addEventListener('click', sendCustomMessage);
            messageInput.addEventListener('input', handleMessageInput);
            
            // Handle Enter key in textarea
            messageInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (!sendBtn.disabled) {
                        sendCustomMessage();
                    }
                }
            });
            
            // Close chat when clicking outside
            document.addEventListener('click', function(e) {
                if (!whatsappChat.contains(e.target) && !whatsappButton.contains(e.target)) {
                    closeChat();
                }
            });
            
            // Update current time in chat
            function updateTime() {
                const now = new Date();
                const timeString = now.toLocaleTimeString('en-US', { 
                    hour12: false, 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
                
                const timeElements = document.querySelectorAll('.message-time');
                timeElements.forEach(el => {
                    if (el.textContent === '16:23') {
                        el.textContent = timeString;
                    }
                });
            }
            
            // Initialize
            updateTime();
            
            // Add entrance animation
            setTimeout(() => {
                whatsappButton.style.opacity = '1';
                whatsappButton.style.transform = 'scale(1)';
            }, 1000);
            
            // Initial state for entrance animation
            whatsappButton.style.opacity = '0';
            whatsappButton.style.transform = 'scale(0)';
            whatsappButton.style.transition = 'all 0.3s ease';
            
        })();
