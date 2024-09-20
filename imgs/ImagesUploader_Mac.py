import sys
import os
import pickle
import shutil
import subprocess
import urllib.parse

from PyQt5 import QtCore, QtWidgets
from PyQt5.QtCore import QSize
from PyQt5.QtWidgets import (
    QMainWindow, 
    QWidget, 
    QLabel, 
    QLineEdit, 
    QInputDialog, 
    QFileDialog,
    QPushButton,
    QMessageBox
)
 

class MainWindow(QMainWindow):
    def __init__(self):
        QMainWindow.__init__(self)

        self.setMinimumSize(QSize(750, 160))
        self.setWindowTitle("ImageUploader")

        self.github_repo_addr, self.local_repo_path = ' '*100, ' '*100
        self.load_configuration()

        # config repo
        github_repo_button = QPushButton('configure remote github repo', self)
        github_repo_button.clicked.connect(self.configure_github_repo_address)
        github_repo_button.resize(200, 32)
        github_repo_button.move(20, 20)
        msg1 = QLabel(self)
        msg1.resize(300, 32)
        msg1.setText('Your github repository address:')
        msg1.move(220, 20)
        self.github_repo_label = QLabel(self)
        self.github_repo_label.resize(300, 32)
        self.github_repo_label.move(450, 20)
        self.github_repo_label.setText(self.github_repo_addr)
        
        local_repo_button = QPushButton('configure local repo path', self)
        local_repo_button.clicked.connect(self.configure_local_repo_path)
        local_repo_button.resize(200,32)
        local_repo_button.move(20, 60)
        msg2 = QLabel(self)
        msg2.resize(300, 32)
        msg2.setText('Your local repository path:')
        msg2.move(220, 60)
        self.local_repo_label = QLabel(self)
        self.local_repo_label.resize(300, 32)
        self.local_repo_label.move(450, 60)
        self.local_repo_label.setText(self.local_repo_path)

        commit_button = QPushButton('commit & push', self)
        commit_button.clicked.connect(self.commit_and_push)
        commit_button.resize(200,32)
        commit_button.move(20, 100)


    def load_configuration(self):
        """load the address of github repository and the path of local repository"""
        config_file = './config/config.pkl'
        if not os.path.exists(config_file):
            return
        with open(config_file, 'rb') as rf:
            config = pickle.load(rf)
            self.github_repo_addr, self.local_repo_path = config['github_repo'], config['local_repo']


    def save_configuration(self):
        """save the address of github repository and the path of local repository"""
        config_file = './config/config.pkl'
        if not os.path.exists('./config'):
            os.makedirs('./config/')
        data = {'github_repo': self.github_repo_addr, 'local_repo': self.local_repo_path}
        with open(config_file, 'wb') as wf:
            pickle.dump(data, wf)


    def configure_github_repo_address(self):
        text, ok = QInputDialog.getText(self, 'Text Input Dialog', 'Input the address starts with git@')
        if ok:
            self.github_repo_addr = str(text)
            self.github_repo_label.setText(str(text))


    def configure_local_repo_path(self):
        text = str(QFileDialog.getExistingDirectory(self))     
        if not (text and text.strip()):
            print('local path is empty')
            return
        else:
            self.local_repo_path = text
            self.local_repo_label.setText(text)


    def commit_and_push(self):
        print('commited clicked')
        self.commit_window = CommitWindow(self.github_repo_addr, self.local_repo_path)
        self.commit_window.create_window()
        self.commit_window.show()


class CommitWindow(QtWidgets.QWidget):
    def __init__(self, github_repo_addr, local_repo_path):
        self.github_repo_addr = github_repo_addr
        self.local_repo_path = local_repo_path

    def create_window(self, WindowWidth=500, WindowHeight=150):
        parent = None
        super(CommitWindow,self).__init__(parent)
        self.setWindowFlags(QtCore.Qt.WindowStaysOnTopHint)
        self.setWindowTitle("add&commit&push")
        self.resize(WindowWidth,WindowHeight)
        
        # choose image to be uploaded
        image_path_label = QLabel(self)
        image_path_label.resize(140, 32)
        image_path_label.setText('select your local image')
        image_path_label.move(20, 20)

        self.img_path_text_box = QLineEdit(self)
        self.img_path_text_box.resize(230, 20)
        self.img_path_text_box.move(170, 25)

        browse_button = QPushButton('browse', self)
        browse_button.clicked.connect(self.choose_file)
        browse_button.resize(80, 32)
        browse_button.move(400, 20)

        # input commit msg
        commit_msg_label= QLabel(self)
        commit_msg_label.resize(140, 32)
        commit_msg_label.setText('commit message')
        commit_msg_label.move(20, 60)

        self.commmit_msg_box = QLineEdit(self)
        self.commmit_msg_box.resize(230, 20)
        self.commmit_msg_box.move(170, 65)

        # commit button
        commit_button = QPushButton('commit and push', self)
        commit_button.clicked.connect(self.commit_and_push)
        commit_button.resize(150, 32)
        commit_button.move(180, 100)


    def choose_file(self):
        file_url, _ = QFileDialog.getOpenFileUrl(self)
        if not file_url:
            print('local path is empty')
            return
        else:
            self.img_path_text_box.setText(file_url.path())

    
    def commit_and_push(self):
        file_path = self.img_path_text_box.text()
        commit_msg = self.commmit_msg_box.text()
        msg_box = QMessageBox()
        msg_box.setBaseSize(800, 200)
        if not (file_path and commit_msg):
            msg_box.setIcon(QMessageBox.Critical)
            msg_box.setText("either img path or commit message is empty")
            msg_box.exec_()
            return
        if file_path:
            shutil.copy(file_path, self.local_repo_path)
        commands = 'cd {local_repo} && '\
                    'git add * && '\
                    'git ci-github -m {commit_msg} && '\
                    'git push origin master'.format(
                        local_repo = self.local_repo_path,
                        commit_msg = commit_msg)

        try:
            print(commands)
            result = os.system(commands)
            if result != 0:
                raise Exception
            # generate img url
            img_name = file_path.split('/')[-1]
            user_name = self.github_repo_addr.split('/')[0].split(':')[1]
            repo_name = self.github_repo_addr.split('/')[-1].rstrip('.git')
            img_url = 'https://raw.githubusercontent.com/{0}/{1}/master/{2}'.format(user_name, repo_name, urllib.parse.quote(img_name))
            msg_box.setIcon(QMessageBox.Information)
            msg = 'Successfully push to the repository {0}\n{1}'.format(self.github_repo_addr,
                                                                        img_url)
            msg_box.setText(msg)
            msg_box.exec_()
        except Exception as e:
            msg_box.setIcon(QMessageBox.critical)
            msg = 'Fail to push to the repository {0}\n'\
                  'Details: {1}'.format(self.github_repo_addr, repr(e))
            msg_box.setText(msg)
            msg_box.exec_()
            return

if __name__ == "__main__":
    try:
        app = QtWidgets.QApplication(sys.argv)
        mainWin = MainWindow()
        mainWin.show()
        app.exec_()
    except Exception as e:
        print('exception in main window, detail {0}'.format(repr(e)))
    finally:
        mainWin.save_configuration()
        sys.exit()
