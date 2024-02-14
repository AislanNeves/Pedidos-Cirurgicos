import styled from 'styled-components'

// Containers

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 100px;

  :after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: url('./backgroundImage.jpg') no-repeat center;
    background-size: cover;
    filter: blur(10px);
    z-index: -1;
  }
`

export const TableContainer = styled.div`
  max-width: 1250px;
  max-height: 1000px;
  padding: 20px;
  margin: auto;
  display: flex;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #fff;
  box-shadow: 0px 0px 19px 5px rgba(0, 0, 0, 0.19);

  :after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: url('./backgroundImage.jpg') no-repeat center;
    background-size: cover;
    filter: blur(10px);
    z-index: -1;
  }
`

// Forms

export const PageTitle = styled.h2`
  position: relative;
  padding: 0 0 10px;
  margin-bottom: 10px;
`

export const FormWrapper = styled.form`
  max-width: 850px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #fff;
  box-shadow: 0px 0px 19px 5px rgba(0, 0, 0, 0.19);
`

export const FormCover = styled.div`
  background: url('./formCover.jpg') no-repeat center;
  background-size: cover;
  height: 100%;
`

export const FormCol = styled.div`
  padding: 25px 40px;
`

export const Label = styled.label`
  display: block;
  text-align: left;
`

// Text Inputs

export const Input = styled.input`
  width: 100%;
  border: 2px solid rgba(0, 0, 0, 0);
  outline: none;
  background-color: rgba(230, 230, 230, 0.6);
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  margin-bottom: 22px;
  transition: 0.3s;

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  :focus {
    border: 2px solid rgba(30, 85, 250, 0.47);
    background-color: #fff;
  }
`

export const Select = styled.select`
  width: 100%;
  border: 2px solid rgba(0, 0, 0, 0);
  outline: none;
  background-color: rgba(230, 230, 230, 0.6);
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  margin-bottom: 22px;
  transition: 0.3s;

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  :focus {
    border: 2px solid rgba(30, 85, 250, 0.47);
    background-color: #fff;
  }
`

export const Textarea = styled.textarea`
  min-height: 150px;
  max-height: 150px;
  width: 100%;
  border: 2px solid rgba(0, 0, 0, 0);
  outline: none;
  background-color: rgba(230, 230, 230, 0.6);
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  margin-bottom: 22px;
  transition: 0.3s;

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  :focus {
    border: 2px solid rgba(30, 85, 250, 0.47);
    background-color: #fff;
  }
`

// History List

export const HistoryList = styled.div`
  flex: 1;
  overflow-x: auto;

  #ordersList {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  #ordersList td,
  #ordersList th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  #ordersList tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  #ordersList tr:hover {
    background-color: #ddd;
  }

  #ordersList th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04aa6d;
    color: white;
  }
`

// Buttons

export const Button = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #2ecc71;
  color: #fff;
  font-size: 1.1rem;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    background-color: #27ae60;
  }
`

export const Toogle = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  text-align: center;
  width: 100px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  :hover {
    background-color: #2980b9;
  }
`
