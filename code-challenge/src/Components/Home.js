import styled from 'styled-components';
import Input from './Input';

const Home = () => {
    return (
        <SHome className='col-6'>
            <h2>Link Shortener</h2>
            <Input />
        </SHome>
    )
}

const SHome = styled.div`
    margin-top: 2rem;
    background-color: var(--primary-color);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 1rem;
    border-radius: 1.5rem;

    h2 {
        padding: 1rem;
    }
`

export default Home;