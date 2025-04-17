document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("root");

  const nav = `
    <nav style='padding: 1rem; background: white; border-bottom: 1px solid #ddd; display: flex; gap: 1.5rem; font-weight: bold;'>
      <a href="#/">Home</a>
      <a href="#/activities">Activities</a>
      <a href="#/leaders">Leaders</a>
      <a href="#/board">Board</a>
    </nav>
  `;

  const routes = {
    "/": "<h1>🏠 Welcome to OPQR</h1><p>This is our official site!</p>",
    "/activities": `
      <h1>🎒 Activities</h1>
      <div><strong>Social:</strong> Trips, Hangouts, Food</div>
      <div><strong>Projects:</strong> Capstone collab, cross-major projects</div>
    `,
    "/leaders": `
      <h1>👑 Former Presidents</h1>
      <ul>
        <li>2024 - Alice</li>
        <li>2023 - Bob</li>
        <li>2022 - Charlie</li>
      </ul>
    `,
    "/board": `
      <h1>📝 Board</h1>
      <form id="postForm">
        <input placeholder="Title" required /><br/>
        <textarea placeholder="Content" required></textarea><br/>
        <input type="file" accept="image/*" /><br/>
        <button type="submit">Post</button>
      </form>
      <div id="posts"></div>
    `
  };

  const render = () => {
    const hash = location.hash.replace("#", "") || "/";
    const content = routes[hash] || "<h1>404 Not Found</h1>";
    root.innerHTML = nav + `<main style='padding:2rem;'>${content}</main>`;

    if (hash === "/board") {
      const form = document.getElementById("postForm");
      const posts = document.getElementById("posts");

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = form.querySelector("input").value;
        const content = form.querySelector("textarea").value;
        const fileInput = form.querySelector("input[type='file']");
        const file = fileInput.files[0];

        const reader = new FileReader();
        reader.onload = function (event) {
          const postHtml = `
            <div style='margin-top:1rem; padding:1rem; border:1px solid #ccc;'>
              <h3>${title}</h3>
              <p>${content}</p>
              ${file ? `<img src='${event.target.result}' style='max-width:200px;' />` : ""}
            </div>
          `;
          posts.innerHTML = postHtml + posts.innerHTML;
          form.reset();
        };

        if (file) {
          reader.readAsDataURL(file);
        } else {
          reader.onload({ target: { result: "" } });
        }
      });
    }
  };

  window.addEventListener("hashchange", render);
  render();
});
