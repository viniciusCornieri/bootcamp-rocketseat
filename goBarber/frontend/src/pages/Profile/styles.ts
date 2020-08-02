import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;

    display: flex;
    align-items: center;

    svg {
      color: #999591;
      height: 24px;
      width: 24px;
    }
    div {
      max-width: 1120px;
      margin: 0 auto;
      width: 100%;
    }
  }
`;

export const Content = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  place-content: center;
  margin: -176px auto;

  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 36px;
  position: relative;
  width: 186px;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  button {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #ff9000;
    border: 0;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
