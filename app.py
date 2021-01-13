from PIL import Image, ImageGrab, ImageOps
import pytesseract
import time
import json

pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'

fullString = ""


class Contract:
    def __init__(self, name, currentValue, previousValue):
        self.name = name
        self.currentValue = currentValue
        self.previousValue = previousValue

    def checkString(self):
        global fullString
        if self.name in fullString.lower():
            self.currentValue = True
        else:
            self.currentValue = False

    def emitValue(self):
        if self.currentValue != self.previousValue:
            print(json.dumps({'name': self.name,
                              'value': self.currentValue}))

    def updateValue(self):
        self.previousValue = self.currentValue


contractList = []

contractList.append(Contract('scavenger', False, False))
contractList.append(Contract('recon', False, False))
contractList.append(Contract('bounty', False, False))
contractList.append(Contract('supply', False, False))
contractList.append(Contract('hunted', False, False))
contractList.append(Contract('wanted', False, False))


def getText():
    global fullString
    start_time = time.time()
    screenshot = ImageGrab.grab(bbox=(30*2, 270*2, 300*2, 740*2))
    grayScreenshot = ImageOps.grayscale(screenshot)

    custom_config = r'--oem 3 --psm 6'
    fullString = pytesseract.image_to_string(
        grayScreenshot, config=custom_config)

    for i in range(len(contractList)):
        contractList[i].checkString()
        contractList[i].emitValue()
        contractList[i].updateValue()


while True:
    getText()
