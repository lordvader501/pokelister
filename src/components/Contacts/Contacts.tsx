import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import bgContactImg from '../../assets/contacts-bg.jpg';

const ContactLayout: React.FC = () => {
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === '/contacts') {
			const toAddBackgroundImg = document.getElementById('gc');
			if (toAddBackgroundImg) {
				toAddBackgroundImg.style.backgroundImage = `url(${bgContactImg})`;
				toAddBackgroundImg.style.backgroundPosition = 'center';
				toAddBackgroundImg.style.backgroundSize = 'cover';
				toAddBackgroundImg.style.backgroundBlendMode = 'darken';
				toAddBackgroundImg.style.backgroundColor = '#2d2d2d59';
			}
		}
	}, []);

	return (
		<div className='container'>
			<h1>Contact Us</h1>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non perspiciatis nesciunt autem accusamus quod nam ad vitae maxime saepe incidunt. Corrupti mollitia a nulla aliquid. At consequatur optio dolorum architecto tempora, laudantium ratione nesciunt porro quas quod ut ipsa mollitia libero ducimus cum modi ad voluptate, ex vero commodi consectetur ipsum? Maxime, veniam! Facilis nobis tempore laudantium atque impedit libero illum perspiciatis architecto quidem laboriosam provident vel debitis dicta nesciunt aliquid doloremque et rerum perferendis velit, molestias, delectus, dignissimos sed iure. Sapiente quaerat nisi consectetur animi similique aperiam explicabo beatae ea ex, dolorem, perferendis voluptatibus, sit inventore? Corrupti obcaecati placeat dolor quisquam, esse, quibusdam accusamus itaque debitis iure, aliquam rerum amet fuga ipsa quam corporis. Dolorem neque voluptates eaque, maxime nulla cupiditate, placeat architecto doloremque optio tempore eius aperiam minus ut quae. Ipsam, distinctio labore! Sed quidem ab earum. Dolorem unde sint dolores. Vitae similique aliquam nam illum ad quia, praesentium dignissimos, consectetur voluptatum hic alias voluptates blanditiis dicta explicabo distinctio nesciunt facilis eaque ullam magnam, mollitia obcaecati sed iste corrupti unde! Dignissimos porro similique eos dolore magnam impedit at consectetur laudantium officiis voluptatibus, dicta in et facere veniam iure nostrum unde voluptas voluptatem placeat corporis. Beatae aliquam delectus quisquam.</p>
		</div>
	);
};

export default ContactLayout;