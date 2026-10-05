import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Utilisateur } from '../entities/utilisateur.entity';
import { Role } from '../entities/role.entity';

export async function seedAuth(dataSource: DataSource): Promise<void> {
  const roleRepo = dataSource.getRepository(Role);
  const utilisateur = dataSource.getRepository(Utilisateur);

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
  const existingAdmin = await utilisateur.findOne({ where: { email: 'admin@reassurance.com' } });
  
  if (!existingAdmin) {
    const adminUser = utilisateur.create({
      email: 'admin@reassurance.com',
      password: await bcrypt.hash('Admin123!', 10),
      nom: 'Admin',       // Adaptez selon votre entité (nom ou firstName)
      prenoms: 'Système', // Adaptez selon votre entité (prenoms ou lastName)
      roles: adminRole ? [adminRole] : [],
      isActive: true,
    });
    
    await utilisateur.save(adminUser);
    console.log('   ✅ Utilisateur Admin créé avec succès');
  } else {
    console.log('   ℹ️ Utilisateur Admin existe déjà, création ignorée');
  }

  console.log('✅ Auth seed terminé avec succès (Idempotent)');
}

