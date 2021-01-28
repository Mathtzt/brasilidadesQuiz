import Link from 'next/link'
import React from "react";
import styled from "styled-components";

const NavHomePageBase = styled.div`
  margin-top: 25px;
  
  a {
    font-size: 16px;
    font-weight: bold;
    color: ${({theme}) => theme.colors.secondary};
    text-decoration: none;

    &:hover {
      color: ${({theme}) => theme.colors.contrastText};
    }
  }
  
 
`;

export default function NavHomePage() {
    return (
        <div>
            <NavHomePageBase>
                <Link href="/">
                    <a>Jogar Novamente!</a>
                </Link>
            </NavHomePageBase>
        </div>
    )
}
