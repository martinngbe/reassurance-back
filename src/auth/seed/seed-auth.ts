import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Utilisateur } from '../entities/utilisateur.entity';
import { Role } from '../entities/role.entity';

export async function seedAuth(dataSource: DataSource): Promise<void> {
  const roleRepo = dataSource.getRepository(Role);
  const userRepo = dataSource.getRepository(Utilisateur);

  console.log('🔄 Vérification des données d\'authentification...');

  // 1. Créer les rôles UNIQUEMENT s'ils n'existent pas déjà
  const rolesData = [
    { code: 'ADMIN', label: 'Administrateur', description: 'Accès complet au système' },
    { code: 'GESTIONNAIRE', label: 'Gestionnaire', description: 'Gestion des quittances et sinistres' },
    { code: 'COURTIER', label: 'Courtier', description: 'Gestion des polices' },
    { code: 'REASSUREUR', label: 'Réassureur', description: 'Consultation des données de réassurance' },
    { code: 'CONSULTANT', label: 'Consultant', description: 'Lecture seule' },
  ];

  for (const roleData of rolesData) {
    const existingRole = await roleRepo.findOne({ where: { code: roleData.code } });
    if (!existingRole) {
      await roleRepo.save(roleRepo.create(roleData));
      console.log(`   ✅ Rôle créé : ${roleData.code}`);
    }
  }

  // Récupérer le rôle ADMIN (il est garanti d'exister maintenant)
  const adminRole = await roleRepo.findOne({ where: { code: 'ADMIN' } });

  // 2. Créer l'admin UNIQUEMENT s'il n'existe pas déjà
  const existingAdmin = await userRepo.findOne({ where: { email: 'admin@reassurance.com' } });
  
  if (!existingAdmin) {
    const adminUser = userRepo.create({
      email: 'admin@reassurance.com',
      password: await bcrypt.hash('Admin123!', 10),
      nom: 'Admin',       // Adaptez selon votre entité (nom ou firstName)
      prenoms: 'Système', // Adaptez selon votre entité (prenoms ou lastName)
      roles: adminRole ? [adminRole] : [],
      isActive: true,
    });
    
    await userRepo.save(adminUser);
    console.log('   ✅ Utilisateur Admin créé avec succès');
  } else {
    console.log('   ℹ️ Utilisateur Admin existe déjà, création ignorée');
  }

  console.log('✅ Auth seed terminé avec succès (Idempotent)');
}


// export async function seedAuth(dataSource: DataSource): Promise<void> {
//   const roleRepo = dataSource.getRepository(Role);
//   const userRepo = dataSource.getRepository(Utilisateur);

//   // 1. Créer les rôles
//   const roles = await roleRepo.save([
//     roleRepo.create({
//       code: 'ADMIN',
//       label: 'Administrateur',
//       description: 'Accès complet au système',
//     }),
//     roleRepo.create({
//       code: 'GESTIONNAIRE',
//       label: 'Gestionnaire',
//       description: 'Gestion des quittances et sinistres',
//     }),
//     roleRepo.create({
//       code: 'COURTIER',
//       label: 'Courtier',
//       description: 'Gestion des polices',
//     }),
//     roleRepo.create({
//       code: 'REASSUREUR',
//       label: 'Réassureur',
//       description: 'Consultation des données de réassurance',
//     }),
//     roleRepo.create({
//       code: 'CONSULTANT',
//       label: 'Consultant',
//       description: 'Lecture seule',
//     }),
//   ]);

//   // 2. Récupérer le rôle ADMIN de manière sûre (évite l'erreur "Role | undefined")
//   const adminRole = roles.find((r) => r.code === 'ADMIN');
  
//   if (!adminRole) {
//     throw new Error("Le rôle ADMIN n'a pas pu être créé ou trouvé.");
//   }

//   // 3. Créer l'admin par défaut
//   const adminUser = userRepo.create({
//     // ⚠️ VÉRIFIEZ CES NOMS DE PROPRIÉTÉS dans votre fichier utilisateur.entity.ts
//     email: 'admin@reassurance.com', // Si l'erreur persiste, vérifiez si c'est 'mail', 'courriel' ou 'adresseEmail'
//     password: await bcrypt.hash('Admin123!', 10),
//     nom: 'Admin',       // Vérifiez si c'est 'nom' ou 'lastName'
//     prenoms: 'Système', // Vérifiez si c'est 'prenoms' ou 'firstName'
//     roles: [adminRole], // ✅ Maintenant, c'est strictement Role[] (plus de undefined)
//     isActive: true,     // Vérifiez si c'est 'isActive' ou 'is_active'
//   });

//   await userRepo.save(adminUser);

//   console.log('✅ Auth seed completed');
//   console.log('   Email: admin@reassurance.com');
//   console.log('   Password: Admin123!');
// }