import About from './Components/About';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home';
import Missing from './Components/Missing';
import Nav from './Components/Nav';
import NewPost from './Components/NewPost';
import PostPage from './Components/PostPage';
import {format} from 'date-fns';
import { Route, useHistory,Switch } from 'react-router-dom';
import {useState,useEffect} from 'react';
import api from './api/posts';
import EditPost from './Components/EditPost';
//Custom Hooks
import useWindowSize from './hooks/useWindowSize';


function App() {
  
  const [posts,setPosts] = useState([]);
  const [search,setSearch] = useState('');
  const [searchResults,setSearchResults] = useState([]);
  const [postTitle,setPostTitle] = useState('');
  const [postBody,setPostBody] = useState('');
  const [editTitle,setEditTitle] = useState('');
  const [editBody,setEditBody] = useState('');

  const history = useHistory();
  const {width} = useWindowSize();

  //GET REQUEST
  useEffect(()=>{
     const fetchPosts = async ()=>{
       try{
          const response = await api.get('/posts');
          setPosts(response.data);
       }
       catch(err){
         if(err.response){
          //If error found which is not in the 200 range
          console.log(err.response.data);
         }
         else{
          console.log(`Error Found :  ${err.message}`);
         }  
       } 
     }
     //Calling
     fetchPosts();
  },[])

  useEffect(()=>{
      const filteredResults = posts.filter(post=>
          ((post.body).toLowerCase()).includes(search.toLowerCase())
          || ((post.title).toLowerCase()).includes(search.toLowerCase()));

      setSearchResults(filteredResults.reverse());    
  },[posts,search])

  //POST REQUEST
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length-1].id+1 : 1;
    const datetime = format(new Date(), 'MMM dd, yyyy pp');
    const newPost = {id,title:postTitle,datetime,body:postBody};
    try{
      //Saving to db
      const response = await api.post('/posts',newPost);

      //Handling useState
      const allPosts = [...posts,response.data]; //Or // const allPosts = [...posts,newPost];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      history.push('/');
    }
    catch(err){
      console.log(`Error: ${err.message}`);
    }  
  }

  //PUT REQUEST
  const handleEdit = async(id)=>{
    const datetime = format(new Date(), 'MMM dd, yyyy pp');
    const updatedPost = {id,title:editTitle,datetime,body:editBody};
    try{
      const response = await api.put(`/posts/${id}`,updatedPost);
      setPosts(posts.map(post=>post.id === id ? {...response.data} : post));
      setEditBody('');
      setEditTitle('');
      history.push('/');
    }
    catch(err){
      console.log(`Error: ${err.message}`);
    } 
  }

  //DELETE REQUEST
  const handleDelete = async(id) =>{
    try{
      await api.delete(`posts/${id}`);
      const postList = posts.filter(post=> post.id !== id)
      setPosts(postList);
      history.push('/');
    }
    catch(err){
      console.log(`Error: ${err.message}`);
    }

  }

  return (
    <div className="App">
      <Header title="Blog Post" width={width}/>
      <Nav search={search} setSearch={setSearch} />
      <Switch>
        <Route exact path="/">
           <Home 
             posts = {searchResults}
           />
        </Route>

        <Route exact path="/post">
           <NewPost
             handleSubmit={handleSubmit}
             postTitle={postTitle}
             setPostTitle={setPostTitle}
             postBody={postBody}
             setPostBody={setPostBody}
           />
        </Route>

        <Route exact path="/edit/:id">
           <EditPost
             posts={posts}
             handleEdit={handleEdit}
             editTitle={editTitle}
             setEditTitle={setEditTitle}
             editBody={editBody}
             setEditBody={setEditBody}
           />
        </Route>

        <Route path="/post/:id">
           <PostPage
             posts={posts}
             handleDelete={handleDelete}
           />
        </Route>

        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
