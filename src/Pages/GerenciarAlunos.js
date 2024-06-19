<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página do Usuário</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
        }
        .container {
            width: 80%;
            margin: 20px auto;
            background-color: #fff;
            padding: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .user {
            display: flex;
            align-items: center;
            padding: 10px;
            border: 2px solid #000;
            border-radius: 15px;
            margin-bottom: 10px;
        }
        .user-image {
            flex: 0 0 100px;
            margin-right: 10px;
            border: 2px solid #000;
            padding: 5px;
            border-radius: 50%;
        }
        .user-image img {
            width: 100%;
            border-radius: 50%;
        }
        .user-info {
            flex: 1;
        }
        .user-info h2 {
            margin: 0 0 5px;
            font-size: 18px;
            color: #808080; /* Cor cinza */
        }
        .user-info label {
            display: block;
            margin: 5px 0;
            font-weight: bold;
            font-size: 14px;
            color: #ff0; /* Cor amarela */
        }
        .user-info .checkbox-group {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        .user-info .checkbox-group label {
            flex: 1 1 30%;
            text-align: left;
        }
        .user-info .checkbox-group span {
            display: block;
        }
    </style>
</head>
<body>

<div class="container">
    <!-- Usuário 1 -->
    <div class="user">
        <div class="user-image">
            <img src="https://via.placeholder.com/100" alt="Imagem do Usuário 1">
        </div>
        <div class="user-info">
            <h2>Tatiana dos Santos</h2>
            <label>Noite</label>
            <label>Ida e Volta</label>
            <label>Seg/Qua/Qui</label>
        </div>
    </div>

    <!-- Usuário 2 -->
    <div class="user">
        <div class="user-image">
            <img src="https://via.placeholder.com/100" alt="Imagem do Usuário 2">
        </div>
        <div class="user-info">
            <h2>Valéria Almeida</h2>
            <label>Noite</label>
            <label>Somente Volta</label>
            <label>Seg/Ter/Qui</label>
        </div>
    </div>

    <!-- Usuário 3 -->
    <div class="user">
        <div class="user-image">
            <img src="https://via.placeholder.com/100" alt="Imagem do Usuário 3">
        </div>
        <div class="user-info">
            <h2>Giovanna Marinho</h2>
            <label>Noite</label>
            <label>Ida e Volta</label>
            <label>Seg/Qui/Sex</label>
        </div>
    </div>
    <!-- Usuário 4 -->
    <div class="user">
        <div class="user-image">
            <img src="https://via.placeholder.com/100" alt="Imagem do Usuário 4">
        </div>
        <div class="user-info">
            <h2>Oliver Germano</h2>
            <label>Noite</label>
            <label>Somente Volta</label>
            <label>Seg/Qui</label>
        </div>
    </div>
    <!-- Usuário 5 -->
    <div class="user">
        <div class="user-image">
            <img src="https://via.placeholder.com/100" alt="Imagem do Usuário 5">
        </div>
        <div class="user-info">
            <h2>Ronielson da Silva</h2>
            <label>Manhã</label>
            <label>Ida e Volta</label>
            <label>Seg/Ter/Qua/Qui/Sex</label>
        </div>
    </div>
    <!-- Usuário 6 -->
    <div class="user">
        <div class="user-image">
            <img src="https://via.placeholder.com/100" alt="Imagem do Usuário 6">
        </div>
        <div class="user-info">
            <h2>Mariana Alves</h2>
            <label>Manhã</label>
            <label>Ida e Volta</label>
            <label>Seg/Ter/Qua</label>
        </div>
    </div>
</div>

</body>
</html>
