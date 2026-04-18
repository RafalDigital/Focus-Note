// List :
// Pengkondisian jika ada isi class content maka class blank hilang ✅
// Date and Day ✅
// Dark mode (baru tombol belum style)
// Notebooks and Notes CRUD
// 
// 
// 
// 
// 
// 
// 

// ============ //
// Dom Elements //
// ============ //

// Blank & Content
const blank = document.getElementById('blank');
const content = document.getElementById('content');

// Date
const dateContent = document.getElementById('date');

// Dark Mode
const darkInput = document.getElementById('dark-mode');
const darkIcon = document.getElementById('dark-icon');

// Notebook & Note
const notebookList = document.getElementById('notebooks-list');
const addNotebookBtn = document.getElementById('add-notebook-form');
// const deleteBtn = document.getElementById('delete-btn');

// Form
const blankForm = document.getElementById('form');
const darkLayer = document.querySelector('.dark-layer');

// ============ //
//    Script    //
// ============ //

// Waktu
const now = new Date; // Tanggal
const Year = now.getFullYear();
const Month = now.getMonth();
const Day = now.getDay() - 1;
const date = now.getDate();
const nameDay = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const nameMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dateFormat = `${nameDay[Day]}, ${nameMonth[Month]} ${date} ${Year}`
dateContent.textContent = dateFormat;

// Blank & Content
if (content.childElementCount > 0) {
    blank.style.display = 'none'
}

// Dark Toggle
darkInput.addEventListener('click', () => {
    if (darkInput.checked) {
        darkIcon.classList.remove('ri-sun-line');
        darkIcon.classList.add('ri-moon-fill');
    } else {
        darkIcon.classList.remove('ri-moon-fill');
        darkIcon.classList.add('ri-sun-line');
    }
})

// Notebook & Note CRUD
function getAllNotebooks() {
    const rawData = localStorage.getItem('Notebooks')
    return rawData ? JSON.parse(rawData) : [];
}

function renderNotebooks(isAddingNotebook = false) {
    const Notebooks = getAllNotebooks();

    notebookList.innerHTML = '';

    if(isAddingNotebook) {
        const draft = document.createElement('div');
        draft.className = 'notebook-card draft';
        draft.innerHTML = `
            <input type="text" id="draft-input" placeholder="Notebook name..." autofocus>
        `;
        notebookList.appendChild(draft);

        const inputDraft = document.getElementById('draft-input');
        inputDraft.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.value.trim() !== '' ) {
                addNotebook(e.target.value);
            } else if (e.key === 'Escape') {
                renderNotebooks();
            }
        })
    }

    Notebooks.forEach((notebook) => {
        const card = document.createElement('div');
        card.className = 'notebook-card'
        card.dataset.id = notebook.id;
        card.innerHTML = `
            <p>${notebook.title}</p>
        <div class="buttons">
            <button title="Edit Notebook" id='edit-btn'><i class="ri-pencil-fill"></i></button>
            <button title="Delete Notebook" id='delete-btn'><i class="ri-delete-bin-6-fill"></i></button>
        </div>
        `;
        notebookList.appendChild(card)
    });
}

function addNotebook(title) {
    const Notebooks = getAllNotebooks();

    const newNotebook = {
        id: Date.now(),
        title: title,
        notes: []
    }

    Notebooks.push(newNotebook);

    localStorage.setItem('Notebooks', JSON.stringify(Notebooks));

    renderNotebooks();
}

// Notebook Buttons Script
function cancelForm() {
    blankForm.classList.toggle('show');
    darkLayer.classList.toggle('show');
    blankForm.innerHTML = '';
}

function deleteNotebookForm(id) {
    const Notebooks = getAllNotebooks();

    const afterDelete = Notebooks.filter(notebook => notebook.id !== Number(id))

    localStorage.setItem('Notebooks', JSON.stringify(afterDelete));

    renderNotebooks();
    cancelForm();
}

addNotebookBtn.addEventListener('click', () => {
    renderNotebooks(true);
});

notebookList.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('#delete-btn');

    if (deleteBtn) {
        const notebookCard = deleteBtn.closest('.notebook-card');
        const notebookId = notebookCard.dataset.id;
        const notebookTitle = notebookCard.querySelector('p').textContent;

        darkLayer.classList.toggle('show');
        blankForm.classList.toggle('show');
        blankForm.innerHTML = `
        <p>Are you sure want to delete "${notebookTitle}"?</p>
            <div class="form-buttons">
                <button onClick="cancelForm()" class="cancel-btn" id="cancel">Cancel</button>
                <button onClick="deleteNotebookForm(${notebookId})" class="submit-btn" id="delete">Delete</button>
            </div>
        `
    }
})

renderNotebooks();