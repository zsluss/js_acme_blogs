// Number 1
createElemWithText = (element = 'p', textContent = '', className) => {
    const elem = document.createElement(element);
    elem.textContent = textContent;
    //since className is optional
    if (className) elem.classList.add(className);
    return elem;
}

// Number 2

//Receives users JSON data as a parameter here
createSelectOptions = (users) => {

    //Returns undefined if no parameter received
    if (!users) return undefined;

    const data = []
    //Loops through the users data
    users.forEach(user => {
        //Creates an option element for each user with document.createElement()
        const option = document.createElement('option');
        //Assigns the user.id to the option.value
        option.value = user.id;
        //Assigns the user.name to the option.textContent
        option.textContent = user.name;
        data.push(option);
    });
    //The function createSelectOptions should return an array. I messed up at the beginning on this one.  Took me a minute to realize.
    return data;
}

// Number 3
toggleCommentSection = (postId) => {
    //Selects the section element with the data-post-id attribute equal to the postId received as a parameter
    const section = document.querySelector(`[data-post-id="${postId}"]`);
    //Use code to verify the section exists before attempting to access the classList property
    if (section) {
        //Toggles the class 'hide' on the section element
        section.classList.toggle('hide');
    }
    //Return the section element
    return section;
}

//Number 4
toggleCommentButton = (postId) => {
    //Selects the button with the data-post-id attribute equal to the postId received as a
    //parameter
    const button = document.querySelector(`[data-post-id="${postId}"]`);
    //If the button textContent is 'Show Comments' switch textContent to 'Hide Comments'
    if (button) {
        if (button.textContent === 'Show Comments') {
            button.textContent = 'Hide Comments';
        } else {
            //If the button textContent is 'Hide Comments' switch textContent to 'Show Comments'
            button.textContent = 'Show Comments';
        }
    }
    //Return the button element
    return button;
}

//Number 5
//Receives a parentElement as a parameter
deleteChildElements = (parentElement) => {
    //define a child variable as parentElement.lastElementChild
    let child = parentElement.lastElementChild;
    //While the child exists…(use a while loop)
    while (child) {
        //Use parentElement.removeChild to remove the child in the loop
        parentElement.removeChild(child);
        //Reassign child to parentElement.lastElementChild in the loop
        child = parentElement.lastElementChild;
    }
    //Return the parentElement
    return parentElement;
}

//Number 6
addButtonListeners = () => {
    //Selects all buttons nested inside the main element -- another one that tripped me up for a bit
    const buttons = document.querySelectorAll('main button');
    //If buttons exist
    if (buttons) {
        //Loop through the NodeList of buttons
        buttons.forEach(button => {
            //Gets the postId from button.dataset.postId
            const postId = button.dataset.postId;
            //If a postId exists, add a click event listener to the button (reference addEventListener) - inside the loop so this happens to each button
            if (postId) {
                button.addEventListener('click', function (e) {
                    //The listener calls an anonymous function (see cheatsheet)
                    //Inside the anonymous function: the function toggleComments is called with the event and postId as parameters
                    toggleComments(e, postId);
                });
                //Return the button elements which were selected
                return button;
            }
        });
    }
    //You may want to define an empty toggleComments function for now. The listener test will NOT pass for addButtonListeners until toggleComments is completed.
    // Nevertheless, I recommend waiting on the logic inside the toggleComments function until we get there.
}

//Number 7
removeButtonListeners = () => {
    //     Selects all buttons nested inside the main element
    const buttons = document.querySelectorAll('main button');
    // Loops through the NodeList of buttons
    if (buttons) {
        buttons.forEach(button => {
            // Gets the postId from button.dataset.id
            const postId = button.dataset.id;
            // If a postId exists, remove the click event listener from the button (reference removeEventListener) - inside the loop so this happens to each button
            if (postId) {
                button.removeEventListener('click', function (e) {
                    // The listener calls an anonymous function (see cheatsheet)
                    // Refer to the addButtonListeners function as this should be nearly identical
                    toggleComments(e, postId);
                });
            }
            // Return the button elements which were selected
            return button;
        });
    }
}

//Number 8
//a. Depends on the createElemWithText function we created
//b. Receives JSON comments data as a parameter
createComments = (comments) => {
    //c. Creates a fragment element with document.createDocumentFragment()
    const fragment = document.createDocumentFragment();
    //d. Loop through the comments
    comments.forEach(comment => {
        //e. For each comment do the following:
        //f. Create an article element with document.createElement()
        const article = document.createElement('article');
        //g. Create an h3 element with createElemWithText('h3', comment.name)
        const h3 = createElemWithText('h3', comment.name);
        //h. Create an paragraph element with createElemWithText('p', comment.body)
        const p1 = createElemWithText('p', comment.body);
        //i. Create an paragraph element with createElemWithText('p', `From: ${comment.email}`)
        const p2 = createElemWithText('p', `From: ${comment.email}`);
        //j. Append the h3 and paragraphs to the article element (see cheatsheet)
        article.append(h3, p1, p2);
        //k. Append the article element to the fragment
        fragment.append(article);
    });
    //l. Return the fragment element
    return fragment;
}


//Number 9
//a. Depends on the createSelectOptions function we created
//b. Receives the users JSON data as a parameter
populateSelectMenu = (users) => {
    //c. Selects the #selectMenu element by id
    const selectMenu = document.getElementById('selectMenu');
    //d. Passes the users JSON data to createSelectOptions()
    const options = createSelectOptions(users);
    //e. Receives an array of option elements from createSelectOptions
    //f. Loops through the options elements and appends each option element to the select menu
    options.forEach(option => {
        selectMenu.append(option);
    });
    //g. Return the selectMenu element
    return selectMenu;
}

//Number 10
//b. Should be an async function
const getUsers = async () => {
    //c. Should utilize a try / catch block
    try {
        //a. Fetches users data from: https://jsonplaceholder.typicode.com/ (look at Resources section)
        //d. Uses the fetch API to request all users
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error('Status code not in 200=299 range');
        //e. Await the users data response
        //f. Return the JSON data
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}
//Number 11
//c. Should be an async function
//a. Receives a user id as a parameter
const getUserPosts = async (userId) => {
    //d. Should utilize a try / catch block    
    try {
        //b. Fetches post data for a specific user id from: https://jsonplaceholder.typicode.com/ (look at Routes section)
        //e. Uses the fetch API to request all posts for a specific user id
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!res.ok) throw new Error('Status code not in 200=299 range');
        //f.Await the users data response
        //g. Return the JSON data
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}

//Number 12
//c. Should be an async function
//a. Receives a post id as a parameter
const getPostComments = async (postId) => {
    //d. Should utilize a try / catch block
    try {
        // b. Fetches comments for a specific post id from: https://jsonplaceholder.typicode.com/ (look at Routes section)
        //e. Uses the fetch API to request all comments for a specific post id
        const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        if (!res.ok) throw new Error('Status code not in 200=299 range');
        //f. Await the users data response
        //g. Return the JSON data
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}
//The next functions will depend on the async API data functions we just created.
//Therefore, these functions will also need to be async. When they call the API functions, they will
//need to await data from those functions.

//Number 13








