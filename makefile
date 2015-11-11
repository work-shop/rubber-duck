#
# makefile
#
# This is the makefile for rubber-duck

RUNTIME = node
ENTRY = index.js

SSH_NAME = workshop@workshopri.site
REMOTE_NAME = live
REMOTE_LOCATION = ssh://$(SSH_NAME)/~/git/quack.help.git

branch = master
provision = false

# the default command is to provision and serve
# a local development environment on port 8000
all: serve

# serve runs the entry file of the server
# which serves static files and provisions
# a socket.io client/server pair
serve:
	$(RUNTIME) $(ENTRY) 

# add the requisite remotes to your local repository
# if you're planning to push to a the live server
add-remotes:
	git remote add $(REMOTE_NAME) $(REMOTE_LOCATION)

# make a deployment to the live repository at quack.help
deploy-live:
	git push $(REMOTE_NAME) +$(branch):refs/heads/master
ifeq ($(provision), true)
	scp -r ./node_modules/* $(SSH_NAME):~/quack.help/node_modules
endif
