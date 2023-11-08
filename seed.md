INSERT INTO `recipe_types` (`NAME`) VALUES ('Normal'); 
INSERT INTO `recipe_types` (`NAME`) VALUES ('Vegano'); 
INSERT INTO `recipe_types` (`NAME`) VALUES ('Vegetariano'); 

INSERT INTO `recipe_categories` (`name`) VALUES ('Salada'); 
INSERT INTO `recipe_categories` (`name`) VALUES ('Café'); 
INSERT INTO `recipe_categories` (`name`) VALUES ('Aperitivo'); 
INSERT INTO `recipe_categories` (`name`) VALUES ('Macarrão'); 
INSERT INTO `recipe_categories` (`name`) VALUES ('Almoço'); 
INSERT INTO `recipe_categories` (`name`) VALUES ('Doce'); 

INSERT INTO `recipe` (`recipe_categories_id`, `recipe_types_id`, NAME, image, serves, kitchen_time, private, user_created) VALUES ('5', '1', 'Strogonoff de Frango', 'https://www.unileverfoodsolutions.com.br/dam/global-ufs/mcos/SLA/calcmenu/recipes/BR-recipes/chicken-&-other-poultry-dishes/strogonoff-de-frango/main-header.jpg', '2','1h', 'b.viacava'); 

INSERT INTO `ingredients` (`id`, `name`, `image`, user_created) VALUES ('1', 'Ovo', 'https://static.vecteezy.com/system/resources/previews/011/993/990/non_2x/chicken-egg-egg-free-png.png', 'b.viacava'); 
INSERT INTO `ingredients` (`id`, `name`, `image`, user_created) VALUES ('2', 'Maionese', 'https://d36rz30b5p7lsd.cloudfront.net/heinzfoodservicebrazil/product/img/78961025831800_hero-min.png', 'b.viacava'); 
INSERT INTO `ingredients` (`id`, `name`, `image`, user_created) VALUES ('3', 'Limão', 'https://www.pngplay.com/wp-content/uploads/2/Lime-Background-PNG-Image.png', 'b.viacava'); 
INSERT INTO `ingredients` (`id`, `name`, `image`, user_created) VALUES ('4', 'Sal', 'https://pngimg.com/d/salt_PNG98694.png', 'b.viacava'); 
INSERT INTO `ingredients` (`id`, `name`, `image`, user_created) VALUES ('5', 'Alface', 'https://png.pngtree.com/png-clipart/20201208/original/pngtree-a-healthy-green-lettuce-png-image_5508896.jpg', 'b.viacava'); 
INSERT INTO `ingredients` (`id`, `name`, `image`, user_created) VALUES ('6', 'Queijo', 'https://static.vecteezy.com/system/resources/previews/009/304/134/non_2x/cheese-clipart-design-illustration-free-png.png', 'b.viacava'); 
INSERT INTO `ingredients` (`id`, `name`, `image`, user_created) VALUES ('7', 'Peito de frango', 'https://tdc01z.vteximg.com.br/arquivos/ids/162059-1000-1000/file-peito-frango-interf--1-.png?v=638082794327600000', 'b.viacava'); 
INSERT INTO `ingredients` (`id`, `name`, `image`, user_created) VALUES ('8', 'Cebola', 'https://static.vecteezy.com/system/resources/previews/029/138/822/non_2x/onion-onion-onion-with-transparent-background-ai-generative-free-png.png', 'b.viacava'); 
INSERT INTO `ingredients` (`id`, `name`, `image`, user_created) VALUES ('9', 'Manteiga', 'https://ojoioeotrigo.com.br/wp-content/uploads/2022/03/manteiga.png', 'b.viacava'); 
INSERT INTO `ingredients` (`id`, `name`, `image`, user_created) VALUES ('10', 'Mostarda', 'https://media.soujusto.com.br/products/11324.png', 'b.viacava'); 
INSERT INTO `ingredients` (`id`, `name`, `image`, user_created) VALUES ('11', 'Creme de leite', 'https://media.soujusto.com.br/products/ITALAC.png', 'b.viacava'); 
INSERT INTO `ingredients` (`id`, `name`, `image`, user_created) VALUES ('12', 'Ketchup', 'https://pngimg.com/d/ketchup_PNG24.png', 'b.viacava'); 
INSERT INTO `ingredients` (`id`, `name`, `image`, user_created) VALUES ('13', 'Batata palha', 'https://www.ultrapack.com.br/wp-content/uploads/2020/09/batatapalha.png', 'b.viacava'); 

INSERT INTO `recipe_ingredients` (recipe_id, ingredient_id, amount) VALUES ('1', '7', '3 peitos'); 
INSERT INTO `recipe_ingredients` (recipe_id, ingredient_id, amount) VALUES ('1', '4', 'A gosto'); 
INSERT INTO `recipe_ingredients` (recipe_id, ingredient_id, amount) VALUES ('1', '8', '1 unidade'); 
INSERT INTO `recipe_ingredients` (recipe_id, ingredient_id, amount) VALUES ('1', '11', '1 caixa'); 
INSERT INTO `recipe_ingredients` (recipe_id, ingredient_id, amount) VALUES ('1', '10', '1/3 copo'); 
INSERT INTO `recipe_ingredients` (recipe_id, ingredient_id, amount) VALUES ('1', '12', '1/2 copo'); 
INSERT INTO `recipe_ingredients` (recipe_id, ingredient_id, amount) VALUES ('1', '13', 'A gosto'); 

INSERT INTO `recipe_steps` (DESCRIPTION, recipe_id) VALUES ('Em uma panela, misture o frango e o sal', '1');
INSERT INTO `recipe_steps` (DESCRIPTION, recipe_id) VALUES ('Em uma frigideira grande, derreta a manteiga e doure a cebola', '1');
INSERT INTO `recipe_steps` (DESCRIPTION, recipe_id) VALUES ('Junte o frango temperado até que esteja dourado', '1');
INSERT INTO `recipe_steps` (DESCRIPTION, recipe_id) VALUES ('Adicione os cogumelos, o ketchup e a mostarda', '1');
INSERT INTO `recipe_steps` (DESCRIPTION, recipe_id) VALUES ('Incorpore o creme de leite e retire do fogo antes de ferver', '1');
INSERT INTO `recipe_steps` (DESCRIPTION, recipe_id) VALUES ('Sirva com arroz branco e batata palha', '1');