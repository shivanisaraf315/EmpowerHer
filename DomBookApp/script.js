// script.js — DOM-based book manager
sortBtn.textContent = sortAsc ? 'Sort by Title: A → Z' : 'Sort by Title: Z → A';
renderBooks();

filterSelect.addEventListener('change', (e)=>{
currentFilter = e.target.value;
renderBooks();
});


function renderBooks(){
// produce a copy to sort/filter
let list = [...books];
if(currentFilter && currentFilter !== 'All'){
list = list.filter(b => b.category === currentFilter);
}
list.sort((a,b)=>{
const ta = a.title.toLowerCase();
const tb = b.title.toLowerCase();
if(ta < tb) return sortAsc ? -1 : 1;
if(ta > tb) return sortAsc ? 1 : -1;
return 0;
});


booksGrid.innerHTML = '';
if(list.length === 0){
booksGrid.innerHTML = '<p class="small-text" style="text-align:center">No books to show.</p>';
return;
}


list.forEach(book => {
const card = document.createElement('div');
card.className = 'book-card';


const img = document.createElement('img');
img.src = book.imageUrl;
img.alt = book.title;


const meta = document.createElement('div');
meta.className = 'book-meta';
meta.innerHTML = `<strong>${escapeHtml(book.title)}</strong><div class="small-text">by ${escapeHtml(book.author)}</div><div class="small-text">${escapeHtml(book.category)}</div>`;


const del = document.createElement('button');
del.className = 'delete-btn';
del.textContent = 'Delete';
del.addEventListener('click', ()=>{
removeBook(book.id);
});


card.appendChild(img);
card.appendChild(meta);
card.appendChild(del);


booksGrid.appendChild(card);
});
}


function removeBook(id){
books = books.filter(b => b.id !== id);
saveBooks();
renderBooks();
}


function saveBooks(){
try{ localStorage.setItem('dombooks', JSON.stringify(books)); }catch(e){console.warn('storage failed',e)}
}


function loadBooks(){
try{
const raw = localStorage.getItem('dombooks');
if(!raw) return [];
return JSON.parse(raw);
}catch(e){return []}
}


// small escape to avoid injected HTML in titles/authors
function escapeHtml(str){
return str.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll('\'','&#39;');
}