// Get references to the necessary HTML elements
const createBlogBtn = document.getElementById('create-blog-btn');
const modalContainer = document.getElementById('modal-container');
const closeModalBtn = document.getElementById('close-modal-btn');
const blogForm = document.getElementById('blog-form');
const blogTitleInput = document.getElementById('blog-title');
const blogDescriptionInput = document.getElementById('blog-description');
const saveBlogBtn = document.getElementById('save-blog-btn');
const blogPostsContainer = document.getElementById('blog-posts-container');

// Array to store blog posts data
let blogPosts = [];

// Function to display the modal
function openModal() {
  modalContainer.style.display = 'block';
}

// Function to close the modal
function closeModal() {
  modalContainer.style.display = 'none';
}

// Function to render the blog posts on the page
function renderBlogPosts() {
  // Clear the blog posts container
  blogPostsContainer.innerHTML = '';

  // Loop through the blog posts array and create HTML elements to display them
  blogPosts.forEach((blogPost, index) => {
    const postContainer = document.createElement('div');
    postContainer.classList.add('post-container');

    const postTitle = document.createElement('h2');
    postTitle.textContent = blogPost.title;

    const postDescription = document.createElement('p');
    postDescription.textContent = blogPost.description;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      // Display the modal with the selected blog post data
      openModal();
      blogTitleInput.value = blogPost.title;
      blogDescriptionInput.value = blogPost.description;

      // Replace the save button with an update button
      saveBlogBtn.textContent = 'Update';
      saveBlogBtn.removeEventListener('click', handleSaveBlog);
      saveBlogBtn.addEventListener('click', () => {
        // Update the selected blog post data
        blogPosts[index].title = blogTitleInput.value;
        blogPosts[index].description = blogDescriptionInput.value;
        closeModal();
        renderBlogPosts();
      });
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      // Remove the selected blog post from the array and re-render the page
      blogPosts.splice(index, 1);
      renderBlogPosts();
    });

    postContainer.appendChild(postTitle);
    postContainer.appendChild(postDescription);
    postContainer.appendChild(editBtn);
    postContainer.appendChild(deleteBtn);

    blogPostsContainer.appendChild(postContainer);
  });
}

// Function to handle the save blog button click
function handleSaveBlog(event) {
  event.preventDefault();

  // Create a new blog post object and add it to the array
  const newBlogPost = {
    title: blogTitleInput.value,
    description: blogDescriptionInput.value,
  };

  blogPosts.push(newBlogPost);
  closeModal();
  renderBlogPosts();

  // Reset the form inputs
  blogTitleInput.value = '';
  blogDescriptionInput.value = '';
}

// Add event listeners to the necessary HTML elements
createBlogBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
blogForm.addEventListener('submit', handleSaveBlog);

// Render the blog posts on page load
renderBlogPosts();
