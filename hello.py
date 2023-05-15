from utils import *
from DL_ClassifierModel import *

dataClass = DataClass(dataPath='path to bdb', 
                      pSeqMaxLen=1024, dSeqMaxLen=128)  


#!curl -Lo conda_installer.py https://raw.githubusercontent.com/deepchem/deepchem/master/scripts/colab_install.py
import conda_installer
conda_installer.install()
!/root/miniconda/bin/conda info -e
!pip install --pre deepchem

