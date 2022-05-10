import styled from "styled-components";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from 'yup';
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import axios from 'axios';

const Input = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [shortLink, setShortLink] = useState('');

    const validationSchema = yup.object().shape({
        link: yup
            .string()
            .required("Please enter your link"),
        domain: yup
            .string()
            .required("Please Select your domain"),
    })

    const linkFormik = useFormik({
        initialValues: {
            link: '',
            domain: 'short_link',
        },
        onSubmit: async (value) => {
            setHasError(false);
            setIsSuccess(false);
            setIsLoading(true);
            try {
                let fetchResult = (await axios.get(`https://api.shrtco.de/v2/shorten?url=${value.link}`)).data;
                setIsLoading(false);
                if (fetchResult.ok) {
                    setIsSuccess(true);
                    switch (value.domain) {
                        case "short_link":
                            setShortLink(fetchResult.result.short_link);
                            break;
                        case "short_link2":
                            setShortLink(fetchResult.result.short_link2);
                            break;
                        case "short_link3":
                            setShortLink(fetchResult.result.short_link3);
                            break;
                        default:
                            break;
                    };
                } else {
                    setHasError(true);
                };

            } catch(error) {
                setHasError(true);
                setIsLoading(false);
            }
        },
        validationSchema: validationSchema,
    })

    return (
        <SInput>
            <Form onSubmit={(e) => { e.preventDefault(); linkFormik.handleSubmit() }}>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label className="form__label">Enter a link </Form.Label>
                    <Form.Control
                        className="form__input"
                        type="text"
                        placeholder="Your link here"
                        name="link"
                        value={linkFormik.values.link}
                        onChange={(e) => { linkFormik.handleChange(e); linkFormik.setTouched(false) }} />
                    <Button variant="primary" type="submit">
                        {isLoading ?
                            <div className="loader"></div> :
                            <FaArrowRight />}
                    </Button>
                </Form.Group>
                {linkFormik.errors.link && linkFormik.touched.link && <div className="form__error">{linkFormik.errors.link}</div>}

                <Form.Group className="mb-3">
                    <Form.Label className="form__label">Select domain</Form.Label>
                    {['radio'].map((type) => (
                        <div key={`default-${type}`} className="mb-3" >
                            <Form.Check
                                type={type}
                                id={`shrtco.de`}
                                label={`shrtco.de`}
                                name="domain"
                                value="short_link"
                                onChange={(e) => { linkFormik.handleChange(e) }}
                                defaultChecked
                            />
                            <Form.Check
                                type={type}
                                id={`9qr.de`}
                                label={`9qr.de`}
                                name="domain"
                                value="short_link2"
                                onChange={(e) => { linkFormik.handleChange(e) }}
                            />
                            <Form.Check
                                type={type}
                                id={`shiny.link`}
                                label={`shiny.link`}
                                name="domain"
                                value='short_link3'
                                onChange={(e) => { linkFormik.handleChange(e) }}
                            />
                        </div>
                    ))}
                </Form.Group>
            </Form>

            {
                isSuccess && !hasError && !isLoading &&
                <div className="result">
                    <h3>Link generated!</h3>
                    <a href={`https://${shortLink}`} target="_blank">{shortLink}</a>
                </div>
            }

            {
                !isSuccess && hasError && !isLoading &&
                <div className="result">
                    <h3 className="result__error">Error</h3>
                </div>
            }
        </SInput>
    )
}

const SInput = styled.div`
    width: 100%;
    padding: 1.5rem 1.5rem;

    form {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        row-gap: 1.3rem;

        .mb-3 {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            column-gap: 0.5rem;
            
            .form__input {
                width: 70%;
                font-size: 1.5rem;
                padding: 0.5rem 1rem;
                background-color: #eee;
                border-radius: 5px;
            }

            button {
                border: none;
                border-radius: 4px;
                padding: 0.7rem;
                display: grid;
                place-items: center;
                cursor: pointer;
                font-size: 1.5rem;
            }

            .form-check-input {
                opacity: 0;
            }

            .form-check-label {
                background-color: #eee;
                color: black;
                padding: 0.3rem 0.7rem; 
                font-size: 1.8rem;
                border-radius: 0.5rem;
                user-select: none;
                cursor: pointer;
            }

            .form-check-input:checked~.form-check-label {
                background-color: var(--secondary-color);
                transition: 0.2s linear;
            }
        }

        .form__error {
            color: red;
            font-weight: bold;
            font-size: 1.8rem;
        }
    }

    .result {
        margin-top: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        column-gap: 1rem;
        align-items: center;
        
            a {
                font-size: 3rem;
                color: var(--highlight-color);
                opacity: 0.8;
            }
        
            a:hover {
                opacity: 1;
            }

            .result__error {
                color: red;
            }
    }
`

export default Input;