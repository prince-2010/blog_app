const NewPost = ({
    handleSubmit, postTitle, setPostTitle, postBody, setPostBody
}) => {
    return (
        <main className="NewPost">
            <h2>Create Post</h2>
            <form className='newPostForm' onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Enter Title:</label>
                <input
                    id="postTitle"
                    type="text"
                    required
                    valaue={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />

                <label htmlFor="postBody">Post:</label>
                <textarea
                    id="postBody"
                    required
                    valaue={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                 >   
                </textarea>
                <button type='submit'>Create</button>
            </form>
        </main>
    )
}

export default NewPost
