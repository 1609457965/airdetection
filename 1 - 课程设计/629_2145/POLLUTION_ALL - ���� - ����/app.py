from flask import Flask, send_from_directory
import webbrowser
import threading

app = Flask(__name__, static_folder='static', static_url_path='/static')
app = Flask(__name__, template_folder='templates')

@app.route('/')
def index():
    return send_from_directory('templates', 'index.html')

@app.route('/2')
def page2():
    return send_from_directory('templates', '2.html')

@app.route('/3')
def page3():
    return send_from_directory('templates', '3.html')

def open_browser():
    webbrowser.open("http://127.0.0.1:8000")

if __name__ == '__main__':
    threading.Timer(1.0, open_browser).start()
    app.run(port=8000, debug=False)