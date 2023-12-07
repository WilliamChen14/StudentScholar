// Filename - components/Footer.js

import ScholarShareLogo from '../assets/ScholarShareLogo.png'
import React from "react";
import {
	Box,
	FooterContainer,
	Row,
	Column,
	FooterLink,
	Heading,
} from "./FooterStyle";

const FooterComponent = () => {
	return (
		<Box>
			<img src={ScholarShareLogo} style={{
				height: "16%",
				width: "16%",
			}}></img>
			<h1
				style={{
					color: "white",
					textAlign: "center",
					marginTop: "10px",
					marginBottom: "50px"
				}}
			>
				StudentScholar
			</h1>
			<FooterContainer>
				<Row>
					<Column>
						<Heading>Contact Us</Heading>
						<FooterLink href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
							<i className="fab fa-facebook-f">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									Scholar Tutorial
								</span>
							</i>
						</FooterLink>
						<FooterLink href="#">
							<i className="fab fa-instagram">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									studScholar@gmail.com
								</span>
							</i>
						</FooterLink>
					</Column>
					<Column>
						<Heading>Social Media</Heading>
						<FooterLink href="https://eelslap.com/" target="_blank">
							<i className="fab fa-facebook-f">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									Facebook
								</span>
							</i>
						</FooterLink>
						<FooterLink href="https://www.instagram.com/mrbeast/" target="_blank">
							<i className="fab fa-instagram">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									Instagram
								</span>
							</i>
						</FooterLink>
					</Column>
					<Column>
						<Heading>Links</Heading>
						<FooterLink href="https://fortnite.fandom.com/wiki/Dance_Moves" target="_blank">
							<i className="fab fa-facebook-f">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									References
								</span>
							</i>
						</FooterLink>
						<FooterLink href="https://pot-cognac.tumblr.com/" target="_blank">
							<i className="fab fa-instagram">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									Experts
								</span>
							</i>
						</FooterLink>
					</Column>
				</Row>
			</FooterContainer>
		</Box>
	);
};
export default FooterComponent;
