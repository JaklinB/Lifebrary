function lifebrary(){
    
    class Book{
        constructor(title, author, genre){
            this.title=title;
            this.author=author;
            this.genre=genre;
        }
    }

    class UI{
        static displayBooks(){

            const books = Store.getBooks();

            books.forEach((book) => UI.addBookToList(book));

        }

        static addBookToList(book){
            const list = document.querySelector('#book-list');

            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td class="delete-td"><a href="#" class="remove-btn">Delete this book</a></td>
            `;

            list.appendChild(row);

        }

        static deleteBook(elem){
            if(elem.classList.contains('remove-btn')){
                elem.parentElement.parentElement.remove();
            }
        }

        static showAlert(msg, className){
            const div = document.createElement('div');
            div.className = `alert ${className}`;
            div.appendChild(document.createTextNode(msg));
            const container = document.querySelector('.container');
            const form = document.querySelector('#book-form');
            container.insertBefore(div, form);
            setTimeout(() => document.querySelector('.alert').remove(), 3000);
        }

        static clearFields(){
            document.querySelector('#title').value = '';
            document.querySelector('#author').value = '';
            document.querySelector('#genre').value = '';
        }

    }

    class Store{
       static getBooks(){
            let books;
            if(localStorage.getItem('books') === null){
                books = [];
            }else{
               books = JSON.parse(localStorage.getItem('books'));
            }

            return books;
        }

       static addBook(book){
            const books = Store.getBooks();
            books.push(book);
            localStorage.setItem('books', JSON.stringify(books));
        }

       static removeBook(title){
            const books = Store.getBooks();
            books.forEach((book, index) => {
                if(book.title === title){
                    books.splice(index, 1);
                }
            });
            localStorage.setItem('books', JSON.stringify(books));
       }
    }

    document.addEventListener('DOMContentLoaded', UI.displayBooks)

    document.querySelector('#book-form').addEventListener('submit', (event) =>{

        event.preventDefault();

        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const genre = document.querySelector('#genre').value;

        if(title === '' || author === '' || genre === ''){
            if(title === '' && author != '' || genre != ''){
                UI.showAlert('Title is required!', 'errorMsg');
            }else if(author === '' && title != '' || genre != ''){
                UI.showAlert('Author is required!', 'errorMsg');
            }else if(title != '' && author != '' && genre === ''){
                UI.showAlert('Genre is required!', 'errorMsg');
            }else{
                UI.showAlert('All fields are required!', 'errorMsg');
            }
            
        }else{
            const book = new Book(title, author, genre);

            UI.showAlert('You have successfully added a book to your Lifebrary!', 'successMsg');
        
            UI.addBookToList(book);

            Store.addBook(book);
    
            UI.clearFields();
        }

    });

    document.querySelector('#book-list').addEventListener('click',(event)=>{
        UI.deleteBook(event.target);
        Store.removeBook(event.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
        UI.showAlert('Book removed!', 'successMsg');
    });

}