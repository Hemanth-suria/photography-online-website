// Gallery data
const galleryImages = [
  {
    id: 1,
    category: "portrait",
    title: "Bridal Portrait",
    alt: "Beautiful bridal portrait in natural lighting",
    src: "  pot1.jpg" 
  },
  {
    id: 2,
    category: "portrait", 
    title: "Couple Portrait",
    alt: "Romantic couple portrait outdoors",
    src: "pot2.jpg"
  },
  {
    id: 3,
    category: "landscape",
    title: "Garden Venue",
    alt: "Beautiful garden wedding venue",
    src: "lands1.jpg"
  },
  {
    id: 4,
    category: "landscape",
    title: "Beach Setting",
    alt: "Romantic beach wedding location",
    src: "lands2.jpg"
  },
  {
    id: 5,
    category: "events",
    title: "Ceremony Moment",
    alt: "Beautiful wedding ceremony moment",
    src: "eve1.png"
  },
  {
    id: 6,
    category: "events",
    title: "Reception Details",
    alt: "Elegant reception table setup",
    src: "eve6.jpg"
  },
  {
    id: 7,
    category: "portrait",
    title: "Bride & Groom",
    alt: "Classic bride and groom portrait",
    src: "pot3.png"
  },
  {
    id: 8,
    category: "landscape",
    title: "Church Exterior",
    alt: "Historic church wedding venue",
    src: "lands6.jpg"
  },
  {
    id: 9,
    category: "events",
    title: "First Dance",
    alt: "Couple's first dance moment",
    src: "eve5.jpg"
  },
  {
    id: 10,
    category: "portrait",
    title: "Bridal Party",
    alt: "Bridal party group portrait",
    src: "pot4.jpg"
  },
  {
    id: 11,
    category: "landscape",
    title: "Vineyard Setting",
    alt: "Romantic vineyard wedding location",
    src: "lands4.jpg"
  },
  {
    id: 12,
    category: "events",
    title: "Ring Exchange",
    alt: "Intimate ring exchange ceremony",
    src: "eve2.jpg"
  },
  
  // Additional Portrait Images
  {
    id: 13,
    category: "portrait",
    title: "Family Portrait",
    alt: "Beautiful family portrait in natural setting",
    src: "pot5.jpg"
  },
  {
    id: 14,
    category: "portrait",
    title: "Engagement Session",
    alt: "Romantic engagement photo session",
    src: "pot6.jpg"
  },

  // Additional Landscape Images
  {
    id: 15,
    category: "landscape",
    title: "Mountain Vista",
    alt: "Breathtaking mountain wedding backdrop",
    src: "lands3.jpg"
  },
  {
    id: 16,
    category: "landscape",
    title: "Sunset Beach",
    alt: "Beautiful sunset beach wedding setting",
    src: "lands5.jpg"
  },

  // Additional Events Images
  {
    id: 17,
    category: "events",
    title: "Cake Cutting",
    alt: "Wedding cake cutting ceremony",
    src: "eve3.jpg"
  },
  {
    id: 18,
    category: "events",
    title: "Wedding Toast",
    alt: "Emotional wedding toast moment",
    src: "eve4.jpg"
  }
];

class BridalStudio {
  constructor() {
    this.galleryElement = document.getElementById('gallery');
    if (!this.galleryElement) {
      console.error('Gallery element not found');
      return;
    }
    this.navButtons = document.querySelectorAll('.nav__button');
  }

  init() {
    this.renderGallery();
    this.setupEventListeners();
    this.addScrollAnimations();
  }

  renderGallery(filter = 'all') {
    if (!this.galleryElement) return;
    
    let filteredImages;
    
    if (filter === 'all') {
      // Sort images by category in desired order
      filteredImages = [...galleryImages].sort((a, b) => {
        const categoryOrder = {
          'portrait': 1,
          'landscape': 2,
          'events': 3
        };
        return categoryOrder[a.category] - categoryOrder[b.category];
      });
    } else {
      filteredImages = galleryImages.filter(img => img.category === filter);
    }

    this.galleryElement.innerHTML = '';
    filteredImages.forEach((image, index) => {
      const item = this.createGalleryItem(image, index);
      this.galleryElement.appendChild(item);
    });
  }

  createGalleryItem(image, index) {
    const div = document.createElement('div');
    div.className = 'gallery__item';
    div.setAttribute('data-category', image.category); // Add this line
    div.innerHTML = `
      <img 
        src="${image.src}" 
        alt="${image.alt}" 
        class="gallery__image"
        loading="lazy"
      >`;
    return div;
  }

  setupEventListeners() {
    this.navButtons.forEach(button => {
      button.addEventListener('click', () => this.handleFilterClick(button));
    });

    const form = document.getElementById('booking-form');
    if (form) {
      form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }
  }

  handleFilterClick(button) {
    this.navButtons.forEach(btn => btn.classList.remove('nav__button--active'));
    button.classList.add('nav__button--active');
    const filter = button.dataset.filter;
    this.renderGallery(filter);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Add form submission logic here
    this.showMessage('Thank you for your submission!', 'success');
  }

  showMessage(text, type) {
    const messageEl = document.getElementById('form-message');
    if (messageEl) {
      messageEl.textContent = text;
      messageEl.className = `form-message form-message--${type}`;
      setTimeout(() => this.hideMessage(), 3000);
    }
  }

  hideMessage() {
    const messageEl = document.getElementById('form-message');
    if (messageEl) {
      messageEl.textContent = '';
      messageEl.className = 'form-message';
    }
  }

  handleInputFocus(e) {
    e.target.parentElement.classList.add('form-group--focused');
  }

  handleInputBlur(e) {
    if (!e.target.value) {
      e.target.parentElement.classList.remove('form-group--focused');
    }
  }

  addScrollAnimations() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, options);

    document.querySelectorAll('.gallery__item').forEach(item => {
      observer.observe(item);
    });
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new BridalStudio();
  app.init();
  
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-in';
  }, 100);
});