package com.jl.prototype;

import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("/publish")
@Produces("text/html")
public class PublishController {

   private static final Logger logger = LoggerFactory.getLogger(PublishController.class);

   private @Context
   ServletContext sc;

   @GET
   @Path("/message")
   public Response publish() {
      /*
      BayeuxServer server = (BayeuxServer)sc.getAttribute(BayeuxServer.ATTRIBUTE);
      LocalSession session = server.newLocalSession("PublishController");
      session.handshake();
      ServerSession serverSession = session.getServerSession();

      logger.info("Server: " + server);
      ServerChannel channel = server.getChannel("/feeds/global");
      if(channel != null) {
         logger.info("Have channel...");
         channel.publish(serverSession, "Hello", null);
      }
      */
      return Response.ok().build();
   }
}
