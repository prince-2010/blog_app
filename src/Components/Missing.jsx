import { Link } from 'react-router-dom';

const Missing = () => {
    return (
        <main className='Missing'>
            <h2>Page Note Found</h2>
            <p>Well, that's disappointing...</p>
            <p>
                <Link to='/'>Vist Our Home Page</Link>
            </p>
        </main>
    )
}

export default Missing
