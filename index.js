export default {
  async fetch(request, env) {
    if (request.method === 'GET') {
      return new Response(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>生成图片</title>
            <style>
              body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
                background-color: #f0f8ff;
              }
              .container {
                text-align: center;
                background-color: #f7f7f7;
                padding: 20px;
                border-radius: 16px;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
              }
              h1 {
                font-size: 24px;
                margin-bottom: 20px;
                color: #333;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
              }
              form {
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .input-container {
                position: relative;
                width: 300px;
                margin-right: 10px;
              }
              input[type="text"] {
                padding: 10px;
                font-size: 19px;
                border: 1px solid #ccc;
                border-radius: 5px;
                width: 100%;
                box-sizing: border-box;
                box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.2);
              }
              .clear-button {
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                cursor: pointer;
                font-size: 20px;
                color: #888;
              }
              .clear-button:hover {
                color: #333;
              }
              input[type="submit"] {
                padding: 9px 15px;
                font-size: 18px;
                border: none;
                border-radius: 5px;
                background-color: #008cba;
                color: white;
                cursor: pointer;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
              }
              input[type="submit"]:hover {
                background-color: #005f5f;
              }
            </style>
            <script>
              function clearInput() {
                document.getElementById('prompt').value = '';
              }
            </script>
          </head>
          <body>
            <div class="container">
              <h1>输入 prompt 生成图片</h1>
              <form method="post">
                <div class="input-container">
                  <input type="text" id="prompt" name="prompt" placeholder="在这里输入你的 prompt">
                  <button type="button" class="clear-button" onclick="clearInput()">×</button>
                </div>
                <input type="submit" value="提交">
              </form>
            </div>
          </body>
        </html>
        `,
        {
          headers: {
            'content-type': 'text/html; charset=UTF-8'
          }
        }
      );
    } else if (request.method === 'POST') {
      const formData = await request.formData();
      const prompt = formData.get('prompt');

      if (!prompt) {
        return new Response("喵喵喵喵喵？", { status: 400 });
      }

      const inputs = {
        prompt: prompt
      };

      const response = await env.AI.run(
        '@cf/stabilityai/stable-diffusion-xl-base-1.0',
        inputs
      );

      return new Response(response, {
        headers: {
          'content-type': 'image/png'
        }
      });
    } else {
      return new Response("Method not allowed", { status: 405 });
    }
  }
};
