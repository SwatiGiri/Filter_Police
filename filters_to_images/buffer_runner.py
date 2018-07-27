import os

start_idx = 0
buffer_size = 100

for i in range(21):
	os.system('node index.js ' + str(start_idx) + ' ' + str(buffer_size))
	start_idx += buffer_size
	print('******************************* {}  ***************************'.format(start_idx))
