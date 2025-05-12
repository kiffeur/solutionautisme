// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Loader
  setTimeout(() => {
    const loader = document.querySelector(".loader-container")
    loader.classList.add("hidden")
    setTimeout(() => {
      loader.style.display = "none"
    }, 500)
  }, 1500)

  // Header scroll effect
  const header = document.querySelector("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const nav = document.querySelector("nav")
  const navLinks = document.querySelectorAll(".nav-links a")

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active")
    menuToggle.classList.toggle("active")
    document.body.classList.toggle("menu-open")
  })

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active")
      menuToggle.classList.remove("active")
      document.body.classList.remove("menu-open")
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Active navigation link based on scroll position
  const sections = document.querySelectorAll("section[id]")

  function highlightNavLink() {
    const scrollPosition = window.scrollY
    const headerHeight = document.querySelector("header").offsetHeight

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.classList.remove("active")
        })
        document.querySelector(`.nav-links a[href="#${sectionId}"]`).classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", highlightNavLink)
  highlightNavLink() // Call once on page load

  // Back to top button
  const backToTopButton = document.querySelector(".back-to-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTopButton.classList.add("active")
    } else {
      backToTopButton.classList.remove("active")
    }
  })

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Testimonial slider
  const testimonialTrack = document.querySelector(".testimonial-track")
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const prevButton = document.querySelector(".prev-testimonial")
  const nextButton = document.querySelector(".next-testimonial")
  const dots = document.querySelectorAll(".dot")
  let currentSlide = 0

  function updateSlider() {
    testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide)
    })
  }

  prevButton.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length
    updateSlider()
  })

  nextButton.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length
    updateSlider()
  })

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index
      updateSlider()
    })
  })

  // Auto slide testimonials
  let testimonialInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length
    updateSlider()
  }, 5000)

  // Pause auto slide on hover
  const testimonialSlider = document.querySelector(".testimonial-slider")
  testimonialSlider.addEventListener("mouseenter", () => {
    clearInterval(testimonialInterval)
  })

  testimonialSlider.addEventListener("mouseleave", () => {
    testimonialInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % testimonialSlides.length
      updateSlider()
    }, 5000)
  })

  // Animate statistics counter
  const statNumbers = document.querySelectorAll(".stat-number")
  let animated = false

  function animateStats() {
    if (animated) return

    const statsSection = document.querySelector(".statistiques")
    const statsSectionTop = statsSection.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (statsSectionTop < windowHeight - 100) {
      statNumbers.forEach((stat) => {
        const targetValue = Number.parseInt(stat.getAttribute("data-count"))
        let currentValue = 0
        const duration = 2000 // 2 seconds
        const increment = targetValue / (duration / 16) // 60fps

        const counter = setInterval(() => {
          currentValue += increment
          if (currentValue >= targetValue) {
            stat.textContent = targetValue
            clearInterval(counter)
          } else {
            stat.textContent = Math.floor(currentValue)
          }
        }, 16)
      })

      animated = true
    }
  }

  window.addEventListener("scroll", animateStats)
  animateStats() // Call once on page load

  // Animate elements on scroll
  const animatedElements = document.querySelectorAll("[data-aos]")

  function checkAnimations() {
    animatedElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementTop < windowHeight - 100) {
        element.classList.add("aos-animate")
      }
    })
  }

  window.addEventListener("scroll", checkAnimations)
  setTimeout(checkAnimations, 100) // Call once after a small delay

  // Form submission handling
  const inscriptionForm = document.getElementById("inscription-form")
  if (inscriptionForm) {
    inscriptionForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simulate form submission
      const submitButton = this.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent
      submitButton.textContent = "Envoi en cours..."
      submitButton.disabled = true

      setTimeout(() => {
        // Show success message
        inscriptionForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Demande envoyée avec succès !</h3>
                        <p>Nous vous contacterons dans les 48h pour un premier entretien.</p>
                    </div>
                `
      }, 1500)
    })
  }

  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simulate form submission
      const submitButton = this.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent
      submitButton.textContent = "Envoi en cours..."
      submitButton.disabled = true

      setTimeout(() => {
        // Show success message
        contactForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Message envoyé avec succès !</h3>
                        <p>Nous vous répondrons dans les plus brefs délais.</p>
                    </div>
                `
      }, 1500)
    })
  }

  // Chatbot functionality
  const chatbotToggle = document.querySelector(".chatbot-toggle")
  const chatbotBox = document.querySelector(".chatbot-box")
  const closeChat = document.querySelector(".close-chatbot")
  const chatMessages = document.querySelector(".chatbot-messages")
  const chatInput = document.querySelector(".chatbot-input input")
  const sendButton = document.querySelector(".send-message")

  chatbotToggle.addEventListener("click", () => {
    chatbotBox.classList.add("active")
  })

  closeChat.addEventListener("click", () => {
    chatbotBox.classList.remove("active")
  })

  // Update chatbot functionality to handle predefined questions
  function sendMessage(message = null) {
    const messageText = message || chatInput.value.trim()
    if (messageText === "") return

    // Add user message
    const userMessageHTML = `
      <div class="message user">
        <div class="message-content">
          <p>${messageText}</p>
        </div>
      </div>
    `
    chatMessages.insertAdjacentHTML("beforeend", userMessageHTML)
    chatInput.value = ""

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight

    // Show typing indicator
    const typingIndicatorHTML = `
      <div class="message bot typing-indicator">
        <div class="message-content">
          <div class="typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    `
    chatMessages.insertAdjacentHTML("beforeend", typingIndicatorHTML)
    chatMessages.scrollTop = chatMessages.scrollHeight

    // Simulate bot response after a delay
    setTimeout(() => {
      // Remove typing indicator
      const typingIndicator = document.querySelector(".typing-indicator")
      if (typingIndicator) {
        typingIndicator.remove()
      }

      let botResponse = ""
      let suggestions = []

      // Predefined responses based on questions
      if (
        messageText.toLowerCase().includes("inscrire") ||
        messageText.toLowerCase().includes("inscription") ||
        messageText.toLowerCase().includes("école")
      ) {
        botResponse =
          "Pour inscrire votre enfant à notre école, veuillez remplir le formulaire d'inscription sur notre site ou nous contacter directement par téléphone au +237 123 456 789."
        suggestions = ["Quels sont les frais de scolarité ?", "Quels documents fournir ?", "Âge d'admission ?"]
      } else if (messageText.toLowerCase().includes("autisme") || messageText.toLowerCase().includes("symptômes")) {
        botResponse =
          "L'autisme est un trouble neurodéveloppemental qui affecte la communication et les interactions sociales. Chaque personne autiste est unique, avec ses propres forces et défis. N'hésitez pas à nous contacter pour plus d'informations ou pour un rendez-vous."
        suggestions = ["Signes de l'autisme ?", "Comment aider un enfant autiste ?", "Vos services thérapeutiques ?"]
      } else if (messageText.toLowerCase().includes("horaire") || messageText.toLowerCase().includes("ouverture")) {
        botResponse =
          "Nous sommes ouverts du lundi au vendredi de 8h à 17h et le samedi de 9h à 12h. L'école accueille les enfants du lundi au vendredi de 8h à 15h."
        suggestions = ["Prendre rendez-vous ?", "Visiter l'école ?"]
      } else if (
        messageText.toLowerCase().includes("contact") ||
        messageText.toLowerCase().includes("adresse") ||
        messageText.toLowerCase().includes("téléphone")
      ) {
        botResponse =
          "Vous pouvez nous contacter au +237 123 456 789 ou par email à contact@solutionautisme.cm. Notre adresse est : Bonamoussadi, Douala, Cameroun."
        suggestions = ["Comment venir ?", "Prendre rendez-vous ?"]
      } else if (
        messageText.toLowerCase().includes("frais") ||
        messageText.toLowerCase().includes("coût") ||
        messageText.toLowerCase().includes("tarif")
      ) {
        botResponse =
          "Les frais de scolarité varient selon le programme et les besoins spécifiques de l'enfant. Nous vous invitons à nous contacter directement pour obtenir des informations détaillées adaptées à votre situation."
        suggestions = ["Modalités de paiement ?", "Bourses disponibles ?"]
      } else if (messageText.toLowerCase().includes("document") || messageText.toLowerCase().includes("dossier")) {
        botResponse =
          "Pour l'inscription, vous devez fournir : certificat de naissance, carnet de santé, photo d'identité récente, et tout rapport médical ou évaluation concernant votre enfant."
        suggestions = ["Procédure d'admission ?", "Délai de traitement ?"]
      } else if (messageText.toLowerCase().includes("âge") || messageText.toLowerCase().includes("admission")) {
        botResponse =
          "Notre école accueille les enfants autistes de 3 à 15 ans. L'admission se fait après une évaluation initiale pour déterminer les besoins spécifiques de l'enfant."
        suggestions = ["Procédure d'évaluation ?", "Programmes disponibles ?"]
      } else if (messageText.toLowerCase().includes("signe") || messageText.toLowerCase().includes("détect")) {
        botResponse =
          "Les signes de l'autisme peuvent inclure des difficultés dans les interactions sociales, la communication, des comportements répétitifs, et une sensibilité inhabituelle aux stimuli sensoriels. Un diagnostic précoce est important."
        suggestions = ["Quand consulter ?", "Processus de diagnostic ?"]
      } else if (messageText.toLowerCase().includes("aider") || messageText.toLowerCase().includes("soutenir")) {
        botResponse =
          "Pour aider un enfant autiste, il est important d'établir une routine stable, d'utiliser des supports visuels, de favoriser la communication adaptée, et de travailler avec des professionnels spécialisés comme ceux de notre centre."
        suggestions = ["Vos approches thérapeutiques ?", "Conseils pour les parents ?"]
      } else if (messageText.toLowerCase().includes("service") || messageText.toLowerCase().includes("thérap")) {
        botResponse =
          "Nous proposons divers services thérapeutiques : orthophonie, psychomotricité, thérapie comportementale (ABA), soutien psychologique, et ateliers de compétences sociales. Chaque programme est personnalisé selon les besoins de l'enfant."
        suggestions = ["Fréquence des séances ?", "Équipe professionnelle ?"]
      } else if (messageText.toLowerCase().includes("rendez-vous") || messageText.toLowerCase().includes("consultat")) {
        botResponse =
          "Pour prendre rendez-vous, appelez-nous au +237 123 456 789 ou envoyez un email à contact@solutionautisme.cm en précisant le motif de votre demande. Nous vous répondrons dans les 48h."
        suggestions = ["Première consultation ?", "Documents à apporter ?"]
      } else if (messageText.toLowerCase().includes("visit")) {
        botResponse =
          "Les visites de l'école se font sur rendez-vous, généralement les mercredis après-midi et samedis matin. Contactez-nous pour organiser une visite guidée de nos installations."
        suggestions = ["Prendre rendez-vous ?", "Localisation exacte ?"]
      } else if (
        messageText.toLowerCase().includes("bonjour") ||
        messageText.toLowerCase().includes("salut") ||
        messageText.toLowerCase().includes("hello")
      ) {
        botResponse = "Bonjour ! Comment puis-je vous aider aujourd'hui ?"
        suggestions = [
          "Comment inscrire mon enfant ?",
          "Qu'est-ce que l'autisme ?",
          "Vos horaires d'ouverture ?",
          "Comment vous contacter ?",
        ]
      } else {
        botResponse =
          "Merci pour votre message. Un membre de notre équipe vous répondra dans les plus brefs délais. Si votre demande est urgente, n'hésitez pas à nous appeler au +237 123 456 789."
        suggestions = [
          "Comment inscrire mon enfant ?",
          "Qu'est-ce que l'autisme ?",
          "Vos horaires d'ouverture ?",
          "Comment vous contacter ?",
        ]
      }

      // Simulate typing effect
      const botMessageHTML = `
        <div class="message bot">
          <div class="message-content">
            <p class="typing-text"></p>
          </div>
        </div>
      `
      chatMessages.insertAdjacentHTML("beforeend", botMessageHTML)

      const typingText = document.querySelector(".typing-text")
      let i = 0
      const typingSpeed = 30 // milliseconds per character

      function typeWriter() {
        if (i < botResponse.length) {
          typingText.textContent += botResponse.charAt(i)
          i++
          chatMessages.scrollTop = chatMessages.scrollHeight
          setTimeout(typeWriter, typingSpeed)
        } else {
          // When typing is complete, add suggestions
          typingText.classList.remove("typing-text")

          // Create suggestions container
          if (suggestions.length > 0) {
            const suggestionsHTML = `
              <div class="chatbot-suggestions-container">
                ${suggestions.map((suggestion) => `<button class="suggestion-button">${suggestion}</button>`).join("")}
              </div>
            `

            // Add suggestions after the last message
            chatMessages.insertAdjacentHTML("beforeend", suggestionsHTML)

            // Add event listeners to new suggestion buttons
            document
              .querySelectorAll(".chatbot-suggestions-container:last-child .suggestion-button")
              .forEach((button) => {
                button.addEventListener("click", function () {
                  sendMessage(this.textContent)
                })
              })
          }

          // Scroll to bottom
          chatMessages.scrollTop = chatMessages.scrollHeight
        }
      }

      // Start typing effect
      typeWriter()
    }, 1000)
  }

  // Update event listeners for chatbot
  sendButton.addEventListener("click", () => sendMessage())

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  })

  // Add event listeners to initial suggestion buttons

  // Add event listeners to suggestion buttons
  document.querySelectorAll(".suggestion-button").forEach((button) => {
    button.addEventListener("click", function () {
      sendMessage(this.textContent)
    })
  })

  // Newsletter form
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const emailInput = this.querySelector('input[type="email"]')
      const email = emailInput.value.trim()

      if (email === "") return

      // Simulate form submission
      const submitButton = this.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent
      submitButton.textContent = "Inscription..."
      submitButton.disabled = true

      setTimeout(() => {
        emailInput.value = ""
        submitButton.textContent = originalText
        submitButton.disabled = false

        // Show success message
        const successMessage = document.createElement("div")
        successMessage.className = "newsletter-success"
        successMessage.innerHTML = "Merci pour votre inscription !"
        successMessage.style.color = "var(--tertiary-color-2)"
        successMessage.style.marginTop = "10px"
        successMessage.style.fontWeight = "500"

        // Remove any existing success message
        const existingMessage = document.querySelector(".newsletter-success")
        if (existingMessage) {
          existingMessage.remove()
        }

        newsletterForm.appendChild(successMessage)

        // Remove success message after 3 seconds
        setTimeout(() => {
          successMessage.remove()
        }, 3000)
      }, 1500)
    })
  }

  // Add CSS for typing animation
  const styleSheet = document.createElement("style")
  styleSheet.textContent = `
    .typing {
      display: flex;
      align-items: center;
      column-gap: 6px;
      padding: 5px 0;
    }

    .typing span {
      display: block;
      width: 8px;
      height: 8px;
      background-color: var(--primary-color);
      border-radius: 50%;
      opacity: 0.4;
    }

    .typing span:nth-child(1) {
      animation: pulse 1s infinite;
    }

    .typing span:nth-child(2) {
      animation: pulse 1s infinite 0.2s;
    }

    .typing span:nth-child(3) {
      animation: pulse 1s infinite 0.4s;
    }

    @keyframes pulse {
      0% {
        opacity: 0.4;
        transform: scale(1);
      }
      50% {
        opacity: 1;
        transform: scale(1.2);
      }
      100% {
        opacity: 0.4;
        transform: scale(1);
      }
    }

    .typing-text {
      border-right: 2px solid var(--primary-color);
      white-space: pre-wrap;
      animation: blink-caret 0.75s step-end infinite;
    }

    @keyframes blink-caret {
      from, to { border-color: transparent }
      50% { border-color: var(--primary-color); }
    }
  `
  document.head.appendChild(styleSheet)

  // Animations interactives pour les sections Mission et Objectifs
  const initMissionObjectifsAnimations = () => {
    const missionCards = document.querySelectorAll('.mission-card');
    const objectifCards = document.querySelectorAll('.objectif-card');

    // Animation interactive pour les cartes de mission
    missionCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.mission-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        
        // Animation légère de pulsation
        let scale = 1.1;
        const pulse = setInterval(() => {
          scale = scale === 1.1 ? 1.08 : 1.1;
          icon.style.transform = `scale(${scale}) rotate(5deg)`;
        }, 500);
        
        // Stocker l'intervalle pour le nettoyer plus tard
        this.setAttribute('data-interval', pulse);
      });

      card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.mission-icon');
        icon.style.transform = '';
        
        // Nettoyer l'intervalle
        clearInterval(parseInt(this.getAttribute('data-interval')));
      });

      // Ajouter une animation au toucher pour les appareils mobiles
      card.addEventListener('touchstart', function() {
        const icon = this.querySelector('.mission-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
      });

      card.addEventListener('touchend', function() {
        const icon = this.querySelector('.mission-icon');
        setTimeout(() => {
          icon.style.transform = '';
        }, 300);
      });
    });

    // Animation interactive pour les cartes d'objectifs
    objectifCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        const number = this.querySelector('.objectif-number');
        number.style.transform = 'scale(1.2)';
        
        // Animation de rotation légère
        let rotation = 0;
        const rotate = setInterval(() => {
          rotation = (rotation + 1) % 6;
          number.style.transform = `scale(1.2) rotate(${rotation - 3}deg)`;
        }, 100);
        
        // Stocker l'intervalle pour le nettoyer plus tard
        this.setAttribute('data-interval', rotate);
      });

      card.addEventListener('mouseleave', function() {
        const number = this.querySelector('.objectif-number');
        number.style.transform = '';
        
        // Nettoyer l'intervalle
        clearInterval(parseInt(this.getAttribute('data-interval')));
      });

      // Ajouter une animation au toucher pour les appareils mobiles
      card.addEventListener('touchstart', function() {
        const number = this.querySelector('.objectif-number');
        number.style.transform = 'scale(1.2)';
      });

      card.addEventListener('touchend', function() {
        const number = this.querySelector('.objectif-number');
        setTimeout(() => {
          number.style.transform = '';
        }, 300);
      });
    });
  };

  // Initialiser les animations après le chargement complet de la page
  window.addEventListener('load', initMissionObjectifsAnimations);

  // Données des réalisations
  const realisationsData = [
    {
      id: 1,
      title: "Partenariat au Zimbabwe",
      date: "Novembre 2024",
      description: "Solution Autisme Cameroun a signé un partenariat stratégique avec des organisations locales au Zimbabwe pour partager son expertise dans le domaine de l'accompagnement des enfants autistes. Cette collaboration internationale marque une étape importante dans le développement de notre organisation et l'expansion de notre mission en Afrique.",
      impact: "Ce partenariat permettra de former plus de 30 professionnels zimbabwéens aux méthodes d'accompagnement des enfants autistes et de soutenir la création d'un centre spécialisé à Harare. Il contribuera également à renforcer les liens entre les communautés africaines engagées dans la cause de l'autisme.",
      participants: "Représentants de Solution Autisme Cameroun, responsables de l'Association zimbabwéenne pour l'autisme, représentants du ministère de la Santé du Zimbabwe et plusieurs ONG locales spécialisées dans le handicap.",
      mainImage: "img/6.jpg",
      images: ["img/6.jpg"]
    },
    {
      id: 2,
      title: "Programme Éducatif Orphée",
      date: "Août 2023",
      description: "Solution Autisme Cameroun a collaboré avec Canal+ pour le développement et le lancement du programme éducatif Orphée, spécialement conçu pour les enfants autistes. Ce programme télévisé innovant propose des contenus adaptés aux besoins spécifiques des enfants atteints de troubles du spectre autistique.",
      impact: "Le programme Orphée est désormais accessible à des milliers de familles à travers l'Afrique francophone, offrant un outil éducatif précieux aux enfants autistes qui n'ont pas toujours accès à des services spécialisés. Les premiers retours des familles indiquent une amélioration de l'attention et de l'engagement des enfants.",
      participants: "L'équipe pédagogique de Solution Autisme Cameroun, les producteurs et réalisateurs de Canal+, des spécialistes en éducation spécialisée et un groupe test de 15 enfants autistes et leurs familles.",
      mainImage: "img/3.jpg",
      images: ["img/3.jpg", "img/a.jpg", "img/e.jpg", "img/g.jpg", "img/f.jpg"]
    },
    {
      id: 3,
      title: "Congrès d'Apprentissage",
      date: "Mai 2024",
      description: "Solution Autisme Cameroun a participé au Congrès International d'Apprentissage sur l'Autisme au Maroc, un événement majeur réunissant des experts du monde entier. Notre organisation a présenté ses méthodes innovantes d'accompagnement et partagé son expérience dans le contexte africain.",
      impact: "Notre participation a permis d'établir de nouveaux partenariats avec des institutions internationales et d'accéder à des ressources et connaissances de pointe. Les méthodes développées par Solution Autisme Cameroun ont été reconnues comme particulièrement pertinentes pour les contextes à ressources limitées.",
      participants: "Trois représentants de Solution Autisme Cameroun ont participé à ce congrès qui a réuni plus de 500 spécialistes, chercheurs et praticiens de 35 pays différents.",
      mainImage: "img/5.jpg",
      images: ["img/5.jpg"]
    },
    {
      id: 4,
      title: "RIAU France",
      date: "2022",
      description: "Solution Autisme Cameroun a été invitée à participer à la Rencontre Internationale de l'Autisme (RIAU) en France, un événement prestigieux qui rassemble les acteurs majeurs du domaine de l'autisme. Notre organisation a pu présenter son travail et échanger avec des experts internationaux sur les meilleures pratiques.",
      impact: "Cette participation a considérablement renforcé la visibilité internationale de Solution Autisme Cameroun et a ouvert la voie à plusieurs collaborations avec des institutions européennes. Nous avons également pu accéder à des ressources pédagogiques et thérapeutiques innovantes que nous avons adaptées au contexte camerounais.",
      participants: "La fondatrice de Solution Autisme Cameroun, accompagnée de deux membres de l'équipe, a représenté l'organisation parmi plus de 1000 participants venus du monde entier.",
      mainImage: "img/7.jpg",
      images: ["img/7.jpg", "img/i.jpg", "img/j.jpg", "img/k.jpg"]
    },
    {
      id: 5,
      title: "Arbre de Noël Inclusif",
      date: "Décembre 2022",
      description: "Solution Autisme Cameroun a organisé un événement spécial pour les fêtes de fin d'année : un Arbre de Noël inclusif pour les enfants autistes et leurs familles. Cette célébration a été soigneusement conçue pour répondre aux besoins sensoriels spécifiques des enfants autistes tout en leur permettant de profiter pleinement de la magie de Noël.",
      impact: "L'événement a offert à plus de 60 enfants autistes et leurs familles un moment de joie et de partage dans un environnement adapté et bienveillant. Pour beaucoup de ces familles, c'était la première fois qu'elles pouvaient participer à une fête de Noël sans stress lié aux difficultés sensorielles ou comportementales.",
      participants: "60 enfants autistes et leurs familles, l'équipe de Solution Autisme Cameroun, 20 bénévoles et plusieurs partenaires qui ont contribué à l'organisation et aux cadeaux distribués.",
      mainImage: "img/10.jpg",
      images: ["img/10.jpg", "img/h.jpg"]
    },
    {
      id: 6,
      title: "Salon de l'Autisme Afrique",
      date: "Mai 2024",
      description: "Solution Autisme Cameroun a participé au premier Salon de l'Autisme Afrique qui s'est tenu à Libreville, au Gabon. Cet événement majeur a réuni des organisations, des professionnels et des familles de tout le continent pour partager les connaissances, les ressources et les bonnes pratiques dans le domaine de l'autisme en Afrique.",
      impact: "Notre participation a permis de renforcer notre réseau panafricain et de positionner Solution Autisme Cameroun comme un acteur clé dans le domaine de l'autisme en Afrique centrale. Nous avons également pu identifier de nouvelles approches et technologies adaptées au contexte africain que nous prévoyons d'intégrer dans nos programmes.",
      participants: "Une délégation de 5 membres de Solution Autisme Cameroun a représenté l'organisation parmi plus de 50 organisations africaines et internationales et environ 2000 visiteurs sur les trois jours du salon.",
      mainImage: "img/11.jpg",
      images: ["img/13.jpg", "img/14.jpg"]
    }
  ];

  // Gestion de la modal des réalisations
  const realisationModal = document.getElementById("realisationModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalMainImage = document.getElementById("modalMainImage");
  const modalThumbnails = document.getElementById("modalThumbnails");
  const modalDate = document.getElementById("modalDate");
  const modalDescription = document.getElementById("modalDescription");
  const modalImpact = document.getElementById("modalImpact");
  const modalParticipants = document.getElementById("modalParticipants");
  const closeModalBtn = document.querySelector(".close-modal");

  // Fonction pour ouvrir la modal avec les détails d'une réalisation
  function openRealisationModal(realisationId) {
    // Trouver la réalisation correspondante
    const realisation = realisationsData.find(item => item.id === realisationId);
    if (!realisation) return;

    // Remplir la modal avec les détails
    modalTitle.textContent = realisation.title;
    modalMainImage.src = realisation.mainImage;
    modalMainImage.alt = realisation.title;
    modalDate.textContent = realisation.date;
    modalDescription.textContent = realisation.description;
    modalImpact.textContent = realisation.impact;
    modalParticipants.textContent = realisation.participants;

    // Générer les miniatures
    modalThumbnails.innerHTML = '';
    realisation.images.forEach((image, index) => {
      const thumbnail = document.createElement("div");
      thumbnail.className = `image-thumbnail ${index === 0 ? 'active' : ''}`;
      thumbnail.innerHTML = `<img src="${image}" alt="${realisation.title} - image ${index + 1}">`;
      
      // Ajouter un événement pour changer l'image principale
      thumbnail.addEventListener("click", () => {
        // Mettre à jour l'image principale
        modalMainImage.src = image;
        
        // Mettre à jour la classe active
        document.querySelectorAll(".image-thumbnail").forEach(thumb => {
          thumb.classList.remove("active");
        });
        thumbnail.classList.add("active");
      });
      
      modalThumbnails.appendChild(thumbnail);
    });

    // Afficher la modal
    realisationModal.classList.add("active");
    document.body.style.overflow = "hidden"; // Empêcher le défilement de la page
  }

  // Fermer la modal
  function closeRealisationModal() {
    realisationModal.classList.remove("active");
    document.body.style.overflow = ""; // Réactiver le défilement de la page
  }

  // Ajouter les événements pour fermer la modal
  closeModalBtn.addEventListener("click", closeRealisationModal);
  realisationModal.addEventListener("click", (e) => {
    if (e.target === realisationModal) {
      closeRealisationModal();
    }
  });

  // Ajouter des événements aux cartes de réalisation
  document.querySelectorAll(".realisation-card").forEach((card, index) => {
    const realisationId = index + 1; // Correspondance avec les IDs dans realisationsData
    
    // Ajouter un attribut data-id pour faciliter l'identification
    card.setAttribute("data-id", realisationId);
    
    // Ajouter l'événement de clic pour ouvrir la modal
    card.addEventListener("click", () => {
      openRealisationModal(realisationId);
    });
    
    // Ajouter également l'événement au bouton "Voir plus"
    const viewMoreBtn = card.querySelector(".view-more");
    if (viewMoreBtn) {
      viewMoreBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Empêcher le comportement par défaut du lien
        openRealisationModal(realisationId);
      });
    }
  });

  // Ajouter la possibilité de fermer la modal avec la touche Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && realisationModal.classList.contains("active")) {
      closeRealisationModal();
    }
  });
})
