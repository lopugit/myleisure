import sys

file = open('autocss.css','w')

colours = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"]
        #   COLOURS
for x in colours:
    temp = '.colour-'+str(x)+' { color: '+str(x)+' }'
    file.writelines(temp)
    temp = '.color-'+str(x)+' { color: '+str(x)+' }'
    file.writelines(temp)

# for x in range(255):
#     for y in range(255):
#         for z in range(255):
#             for a in range(101):
#                 if a == 100:
#                     temp = '.colour-rgba-'+str(x)+'-'+str(y)+'-'+str(z)+'-100 { color: rgb('+str(x)+','+str(x)+','+str(x)+',1) }'
#                     file.writelines(temp)
#                     temp = '.color-rgba-'+str(x)+'-'+str(y)+'-'+str(z)+'-100 { color: rgb('+str(x)+','+str(x)+','+str(x)+',1) }'
#                     file.writelines(temp)
#                 temp = '.colour-rgba-'+str(x)+'-'+str(y)+'-'+str(z)+'-'+str(a)+' { color: rgb('+str(x)+','+str(x)+','+str(x)+',.'+str(a)+') }'
#                 file.writelines(temp)
#                 temp = '.color-rgba-'+str(x)+'-'+str(y)+'-'+str(z)+'-'+str(a)+' { color: rgb('+str(x)+','+str(x)+','+str(x)+',.'+str(a)+') }'
#                 file.writelines(temp)
#             temp = '.colour-rgb-'+str(x)+'-'+str(y)+'-'+str(z)+' { color: rgb('+str(x)+','+str(x)+','+str(x)+') }'
#             file.writelines(temp)
#             temp = '.color-rgb-'+str(x)+'-'+str(y)+'-'+str(z)+' { color: rgb('+str(x)+','+str(x)+','+str(x)+') }'
#             file.writelines(temp)

        
        #   FONTS
for x in range(50):
    for y in range(10):
        if y == 0:
            temp = '.font-'+str(x)+'em { font-size: '+str(x)+'em; }'
            file.writelines(temp)
            temp = '.font'+str(x)+'em { font-size: '+str(x)+'em; }'
            file.writelines(temp)
        else:
            temp = '.font-'+str(x)+'-'+str(y)+'em { font-size: '+str(x)+'.'+str(y)+'em; }'
            file.writelines(temp)
            temp = '.font'+str(x)+'-'+str(y)+'em { font-size: '+str(x)+'.'+str(y)+'em; }'
            file.writelines(temp)

for x in range(200):
    temp = '.font-'+str(x)+' { font-size: '+str(x)+'px; }'
    file.writelines(temp)
        
for x in range(200):
    temp = '.font-'+str(x)+'px { font-size: '+str(x)+'px; }'
    file.writelines(temp)


        #   PADDING
for y in range(['padding-top','padding-bottom','padding-right','padding-left']):
    for x in range(-1000,1001):
        temp = '.'+str(y)+'-'+str(x)+'px {'+str(y)+':'+str(x)+'px; }'
        file.writelines(temp)

for y in range(['padding-top','padding-bottom','padding-right','padding-left']):
    for x in range(101):
        if y[-1] == 't':
            temp = '.'+str(y)+'-'+str(x)+'vw {'+str(y)+':'+str(x)+'vw; }'
            file.writelines(temp)
        else:
            temp = '.'+str(y)+'-'+str(x)+'vh {'+str(y)+':'+str(x)+'vh; }'
            file.writelines(temp)
