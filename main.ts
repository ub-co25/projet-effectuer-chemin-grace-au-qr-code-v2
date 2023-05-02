DFRobotMaqueenPlus.I2CInit()
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
DFRobotMaqueenPlus.mototStop(Motors.ALL)
DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBA, Color.OFF)
let allumage = 0
let vitesse = 40
led.setBrightness(255)
basic.forever(function () {
    huskylens.request()
    if (!(input.isGesture(Gesture.ScreenUp)) && (input.buttonIsPressed(Button.A) || huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock))) {
        allumage = 1
        DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBR, Color.GREEN)
    }
    while (allumage == 1) {
        huskylens.request()
        if (huskylens.isAppear(7, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            DFRobotMaqueenPlus.mototStop(Motors.ALL)
            basic.showIcon(IconNames.No)
        } else {
            if (huskylens.isAppear(8, HUSKYLENSResultType_t.HUSKYLENSResultBlock) && vitesse < 240) {
                vitesse = vitesse + 40
                basic.showNumber(vitesse)
            }
            if (huskylens.isAppear(9, HUSKYLENSResultType_t.HUSKYLENSResultBlock) && vitesse > 40) {
                vitesse = vitesse - 40
                basic.showNumber(vitesse)
            }
            if (huskylens.isAppear(3, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
                DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CW, vitesse)
                basic.showLeds(`
                    . . # . .
                    . # # # .
                    # . # . #
                    . . # . .
                    . . # . .
                    `)
            }
            if (huskylens.isAppear(4, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
                DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, 40)
                DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CCW, 40)
                basic.showLeds(`
                    . . # . .
                    . # . . .
                    # # # # #
                    . # . . .
                    . . # . .
                    `)
                basic.pause(350)
                DFRobotMaqueenPlus.mototStop(Motors.ALL)
            }
            if (huskylens.isAppear(5, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
                DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, 40)
                DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CCW, 40)
                basic.showLeds(`
                    . . # . .
                    . . . # .
                    # # # # #
                    . . . # .
                    . . # . .
                    `)
                basic.pause(350)
                DFRobotMaqueenPlus.mototStop(Motors.ALL)
            }
            if (huskylens.isAppear(6, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
                DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CCW, vitesse)
                basic.showLeds(`
                    . . # . .
                    . . # . .
                    # . # . #
                    . # # # .
                    . . # . .
                    `)
            }
        }
        if (input.buttonIsPressed(Button.B) || huskylens.isAppear(2, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            allumage = 2
        }
        basic.pause(10)
    }
    if (allumage == 2) {
        DFRobotMaqueenPlus.mototStop(Motors.ALL)
        allumage = 0
    }
    DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBR, Color.RED)
    if (input.isGesture(Gesture.ScreenUp)) {
        DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBL, Color.PINK)
        if (vitesse < 240 && input.buttonIsPressed(Button.B)) {
            vitesse = vitesse + 40
            basic.showNumber(vitesse)
        }
        if (vitesse > 40 && input.buttonIsPressed(Button.A)) {
            vitesse = vitesse - 40
            basic.showNumber(vitesse)
        }
    } else {
        DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBL, Color.OFF)
    }
    basic.pause(10)
})
