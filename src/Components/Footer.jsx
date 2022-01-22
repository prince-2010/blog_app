const Footer = () => {

    const today = new Date();

    return (
        <footer className="Footer">
            <pre>
                Copyright &copy; {today.getFullYear()}   www.blogpost.com
            </pre>
        </footer>
    )
}

export default Footer
