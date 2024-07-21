import styled from '@emotion/styled';

export default function Callout({ title, children, emoji }) {
	return (
		<CalloutContainer>
			<TitleContainer>
				<h2>{emoji}</h2>
				<h2>{title}</h2>
			</TitleContainer>
			<BodyContainer>{children}</BodyContainer>
		</CalloutContainer>
	);
}

const CalloutContainer = styled.div`
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
	width: 100%;
	padding: 1.2rem;
	background-color: #262626;
	border-radius: 10px;
`;

const TitleContainer = styled.div`
	display: flex;
	margin-bottom: 1rem;
	gap: 1rem;
    padding: 0;
    & h2 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: bold;
        color: #fff;
    }
`;

const BodyContainer = styled.div`
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
	width: 100%;
`;
