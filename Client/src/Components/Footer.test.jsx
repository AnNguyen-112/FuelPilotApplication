import { render, screen, fireEvent } from '@testing-library/react';
import Footer from './Footer';
import { Container, containerClasses } from '@mui/system';

test('should render "Products" in footing', () => {
    render(<Footer/>); //Arrange

    //Act
    const footerElement = screen.getByText('Products')
    
    //Assert
    expect(footerElement).toBeInTheDocument()
})

test('should render "Resources" in footing', () => {
    render(<Footer/>); //Arrange

    //Act
    const footerElement2 = screen.getByText('Resources')
    
    //Assert
    expect(footerElement2).toBeInTheDocument()
})

test('should render "Technology" in footing', () => {
    render(<Footer/>); //Arrange

    //Act
    const footerElement3 = screen.getByText('Technology')
    
    //Assert
    expect(footerElement3).toBeInTheDocument() 
})

test('should render "Company" in footing and its children headings "About Us", "Contact", "Career" right under', () => {
    render(<Footer/>); //Arrange

    //Act
    const footerElement4 = screen.getByText('Company')
    
    //Assert
    expect(footerElement4).toBeInTheDocument() 

    //Act again
    const linksContainer = footerElement4.parentElement

    expect(screen.getByText('About us', {Container: linksContainer})).toBeInTheDocument()
    expect(screen.getByText('Career', {Container: linksContainer})).toBeInTheDocument()
    expect(screen.getByText('Contact', {Container: linksContainer})).toBeInTheDocument()

})

test('should render "Available on" in footing', () => {
    render(<Footer/>); //Arrange

    //Act
    const footerElement5 = screen.getByText('Available on')
    
    //Assert
    expect(footerElement5).toBeInTheDocument()
})

test('should allow clicks on "About us", "Career", "Contact" links', () => {
    render(<Footer/>)
    
    const links = ['About us','Career','Contact']

    links.forEach(linkText => {
        const link = screen.getByText(linkText)
        fireEvent.click(link)
    })

})