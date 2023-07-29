import React , { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import bgAboutImg from '../../assets/about-bg.jpeg';

const AboutLayout: React.FC = () => {
	const location = useLocation();
	useEffect(() => {
		if (location.pathname === '/about') {
			const toAddBackgroundImg = document.getElementById('gc');
			if (toAddBackgroundImg) {
				toAddBackgroundImg.style.backgroundImage = `url(${bgAboutImg})`;
				toAddBackgroundImg.style.backgroundPosition = 'center';
				toAddBackgroundImg.style.backgroundSize = 'cover';
			}
		}
	}, []);
	
	return (
		<div className='container'>
			<h1>About Us</h1>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas quasi voluptas, ullam ad nostrum rem similique facilis qui sunt incidunt dignissimos aspernatur. Repudiandae voluptatibus iste aut architecto nostrum adipisci cum consequatur possimus ipsum minus ullam ut, asperiores suscipit neque magnam incidunt fugiat tempore at quos. Velit, tenetur consectetur dicta praesentium optio voluptatem aliquam, architecto quaerat similique veniam ullam laboriosam ipsam blanditiis placeat perspiciatis beatae ab, facilis asperiores? Cum eveniet doloremque quis eaque magnam facere deleniti rerum ut nihil ad similique libero corporis expedita praesentium fugit possimus sunt sit consectetur rem voluptates, alias quia! Minima culpa voluptatibus iure delectus nulla? Voluptatum, repellat laudantium sit labore reiciendis cum. Iure unde recusandae reprehenderit! Hic amet quia, odio neque harum rem sed ullam soluta necessitatibus, illo laborum maxime esse reiciendis labore ut, explicabo quas atque reprehenderit quibusdam veniam! Deserunt id minus quia unde ad necessitatibus voluptatibus consequatur. Exercitationem, commodi vel? Temporibus, excepturi debitis qui soluta, quisquam asperiores, voluptatibus necessitatibus fuga ullam eveniet reiciendis? Repellendus, sit. Repellat eum placeat ipsam numquam quas consectetur eaque voluptas facilis provident odit, eos velit laborum blanditiis incidunt, aperiam hic earum labore consequatur iusto mollitia. Consequuntur velit, amet rerum at suscipit aperiam officiis dignissimos ea similique rem dolor iste? Quisquam, unde! Voluptatibus aperiam asperiores libero possimus voluptas, iure error ipsum eos velit ut, illo sunt reiciendis nisi ducimus rem nobis. Facere quo ipsam quam suscipit eum recusandae soluta iure, facilis aliquid doloribus enim cumque, laborum explicabo eligendi, similique veritatis deleniti. Voluptatibus temporibus ut reprehenderit deleniti beatae sed quasi repudiandae amet, non architecto. Sed nulla officia rem voluptatibus saepe fugiat maxime cumque ipsum repellendus reprehenderit pariatur, sint facilis minima eligendi incidunt quos cupiditate totam blanditiis vitae laudantium omnis temporibus. Beatae perferendis distinctio fugit cumque consequatur, tempore consequuntur eaque nemo et totam temporibus animi? Magni illo unde voluptas pariatur sed accusantium, vel facere expedita modi animi, ipsam ipsum necessitatibus, ab vitae! Totam blanditiis voluptatem maiores nemo. Quia ipsam dicta obcaecati aspernatur dolor, soluta dignissimos, recusandae tempora sapiente nam, quibusdam omnis praesentium ut delectus ipsum numquam eos. Modi ducimus nostrum dignissimos. Vitae culpa libero natus vel in vero minus omnis dolore nobis, nemo praesentium quam laudantium voluptas suscipit nulla, consectetur sint provident reiciendis ad labore voluptate. Assumenda itaque culpa eum nostrum perferendis nulla, unde maiores exercitationem impedit laudantium. Deleniti sit officia tempora repudiandae adipisci ipsum asperiores possimus fugiat dolorum minus vero ad, quis expedita, facere itaque repellendus consequuntur unde praesentium nemo? Doloribus libero iste hic debitis repellat voluptatum molestiae incidunt quis expedita, fuga reiciendis quia repellendus, nam sed minus. Enim maxime totam esse molestiae officiis. Sed deserunt, eligendi voluptatibus architecto totam tempora corporis perferendis qui ipsum quas quidem consequuntur enim est mollitia et libero magni doloribus eveniet obcaecati nisi, error quo velit. Placeat molestiae provident ab maxime assumenda, distinctio qui deleniti libero omnis vel incidunt? Cumque commodi excepturi cum sit facilis similique quas quos ab animi laudantium tempore, nihil optio unde ad est dolores fuga iste nesciunt perspiciatis. Repudiandae sapiente delectus voluptate eveniet minima quidem nobis, dignissimos quasi tempora vel corrupti iste vitae?</p>
      
		</div>
	);
};

export default AboutLayout;